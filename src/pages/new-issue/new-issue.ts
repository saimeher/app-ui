import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { AlertController } from 'ionic-angular';

import { AppSettings } from '../app.settings';
import { ApiService, Issue, DeviceService, SharedService, DateToIso } from '../../common/common';
import { IssuesListPage } from '../pages';

declare var cordova: any;

@Component({
  selector: 'page-new-issue',
  templateUrl: 'new-issue.html'
})
export class NewIssuePage {
  lastImage: string = null;
  images: Array<any> = [];
  editImages: Array<any> = [];
  loading: Loading;
  newFileName: string;

  did: number;
  domains: Array<{ title: string, value: string }>;
  domain;
  status;

  issue: Issue = {
    domain: 'civil',
    issue_desc: 'Issue Description',
    location: 'Locationa',
    problem: 'Problem',
    raised_by: this._sharedService.name,
    mobile: this._sharedService.mobile,
    role: 'role',
    image: '',
    deletedImages: '',
    // priority: 'low',
    // repaired_on: 'repaired_on',
    // repaired_by: 'repaired_by',
    // date_of_resolution: 'date_of_resolution',
    // notes: 'notes',
  };

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController, public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private _apiService: ApiService,
    private _deviceService: DeviceService,
    private _sharedService: SharedService) {

    this.domains = AppSettings.domains;
    this.status = AppSettings.status;
  }

  ionViewDidEnter() {
    const _dateToIso = new DateToIso();

    this.images = [];
    this.editImages = [];

    if (this.navParams.data > 0) {
      this.did = this.navParams.data;
      if (this.did) {
        this._apiService.callApi(AppSettings.getIssueApi, "post", { did: this.did }).subscribe(data => {
          if (data.success) {
            let temp = data.data[0];
            this.issue = {
              did: this.did,
              domain: temp.domain,
              issue_desc: temp.issue_desc,
              location: temp.location,
              problem: temp.problem,
              raised_by: temp.raised_by,
              mobile: temp.mobile,
              role: this._sharedService.role,
              image: temp.image,
              deletedImages: '',
            };

            if (this._sharedService.role === 'admin') {
              this.issue.priority = temp.priority;
              this.issue.repaired_by = temp.repaired_by;
              this.issue.repaired_on = temp.repaired_on != null ? _dateToIso.transform(temp.repaired_on, null) : '';
              this.issue.date_of_resolution = temp.date_of_resolution;
              this.issue.notes = temp.notes;
              this.issue.status = temp.status;
            }

            // display images
            if (this.issue.image && this.issue.image.length) {
              this.issue.image.split(',').forEach(item => {
                this.editImages.push(AppSettings.imageUrl + item);
              });
            }



            console.log(JSON.stringify(this.issue));

          } else {
            this._sharedService.presentToast('Error retrieving data to edit');
          }
        });
      }
    }
  }

  public save() {
    // Spiner Lodder


    // remove deleted images from issue.image
    if (this.issue.deletedImages && this.issue.deletedImages.length > 0 && this.issue.did > 0) {
      this.issue.deletedImages.split(',').forEach(item => {
        this.issue.image = this.issue.image.replace(item, '');
      });
    }

    // remove extra commas
    if (this.issue.image && this.issue.image.length > 0) {
      this.issue.image = this.issue.image.replace(/[, ]+/g, ',').trim();

      if (this.issue.image.substr(0, 1) == ',') {
        this.issue.image = this.issue.image.substr(1);
      }

      if (this.issue.image.substr(this.issue.image.length - 1, 1) == ',') {
        this.issue.image = this.issue.image.substr(0, this.issue.image.length - 1);
      }
    }


    this.uploadImage();
  }

  insertData(body) {

    let load = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...',
      dismissOnPageChange: true
    });

    load.present();

    this._apiService.callApi(AppSettings.newIssueApi, 'post', body)
      .subscribe(data => {
        if (data.success) {
          if (this.did) {
            this._sharedService.presentToast('Issue updated successfully');
          } else {
            this._sharedService.presentToast('Issue registered successfully');
          }

          // this.loading.dismiss();

          // delete images
          // this.images.forEach(image => {
          //   File.removeFile(this.pathForImage(image), image);
          // });
          // this.loading.dismiss().catch(() => console.log('ERROR CATCH: LoadingController dismiss'));
          // this.navCtrl.setRoot(IssuesListPage);

          // this.load.dismiss().then(() => { this.navCtrl.setRoot(IssuesListPage); });
          load.dismiss();

          this.navCtrl.push(IssuesListPage);


        }
      });


  }

  removeImage(image, type) {
    console.log("remove image:", image, "type: ", type);

    let temp;
    switch (type) {
      case 'new': temp = this.images; break;
      case 'edit': temp = this.editImages; break;
    }

    let i = temp.indexOf(image);
    if (i != -1) {

      if (this.issue.did > 0) {
        if (this.issue.deletedImages.length == 0) {
          this.issue.deletedImages = temp.splice(i, 1).toString();
        } else {
          this.issue.deletedImages = this.issue.deletedImages + ',' + temp.splice(i, 1).toString();
        }

        this.issue.deletedImages = this.issue.deletedImages.replace(AppSettings.imageUrl, '');

      } else {
        temp.splice(i, 1);
      }

      // remove server name from image
    }

    if (type === 'new') {
      this.issue.image = this.issue.image.replace(image, '');
    }

  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 50,
      // destinationType: Camera.DestinationType.DATA_URL,
      // encodingType: Camera.EncodingType.JPEG,
      // mediaType: Camera.MediaType.PICTURE,

      targetWidth: 800,
      targetHeight: 600,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64:
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    //   this.issue.image = base64Image;
    // }, (err) => {
    //   // Handle error
    // });

    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {

      // Special handling for Android library
      if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        FilePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }

      // let base64Image = 'data:image/jpeg;base64,' + imagePath;
      // this.issue.image = this.newFileName;
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });



  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";

    if (!this.issue.image) {
      this.issue.image = newFileName;
    } else {
      this.issue.image = this.issue.image + ',' + newFileName;
    }


    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.images.push(newFileName);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = AppSettings.uploadUrl;

    this.images.forEach(item => {
      // File for Upload
      var targetPath = this.pathForImage(item);

      // File name only
      var filename = item;

      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params: { 'fileName': filename }
      };

      const fileTransfer = new Transfer();

      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
      });
      this.loading.present();

      // Use the FileTransfer to upload the image
      fileTransfer.upload(targetPath, url, options).then(data => {
        this.loading.dismissAll();

      }, err => {
        this.loading.dismissAll()
        this.presentToast('Error while uploading file.');
      });
    });
    const body = { issue: this.issue };
    this.insertData(body);
  }



}
