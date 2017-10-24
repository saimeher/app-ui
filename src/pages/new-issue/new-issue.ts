import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { AlertController } from 'ionic-angular';

import { AppSettings } from '../app.settings';
import { ApiService, Issue, DeviceService, SharedService, DateToIso } from '../../common/common';
import { IssuesListPage } from '../pages';


declare var cordova: any;

@Component({
  selector: 'page-new-issue',
  templateUrl: 'new-issue.html',
  styles: [`
        .invalid {
            border-top: 1px dotted #ea6153;
            border-right: 1px dotted #ea6153;
        }        
  `]
})
export class NewIssuePage {
  issueForm: FormGroup;
  lastImage: string = null;
  images: Array<any> = [];
  editImages: Array<any> = [];
  loading: Loading;
  newFileName: string;

  did: number;
  domains: Array<{ title: string, value: string }>;
  domain;
  status;
  reset;
  name;
  role;
  role1;
  domain_admin;
  showdays = '';
  searchQuery: string = '';
  items = [];


  submitAttempt: boolean = false;
  tempPatch;      // if user is not admin, but tries to update status in another category (fixx)

  issue: Issue = {
    domain: '',
    issue_desc: '',
    location: '',
    problem: '',
    raised_by: this._sharedService.username,
    mobile: this._sharedService.mobile,
    role: this._sharedService.role,
    role1: sessionStorage.getItem('roleadmin'),
    reg_no: this._sharedService.reg_no,
    image: '',
    deletedImages: '',
    // priority: 'low',
    // repaired_on: 'repaired_on',
    // repaired_by: 'repaired_by',
    // date_of_resolution: 'date_of_resolution',
    // notes: 'notes',
  };

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    private navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController, public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private _apiService: ApiService,
    private _deviceService: DeviceService,
    private _sharedService: SharedService) {

    this.issueForm = formBuilder.group({
      did: [''],
      domain: ['', Validators.required],
      issue_desc: ['', Validators.required],
      location: ['', Validators.required],
      problem: ['', Validators.required],
      raised_by: [this._sharedService.username],
      reg_no: [this._sharedService.reg_no],
      mobile: [this._sharedService.mobile],
      // status: [''],
      // priority: [''],
      // repaired_on: [''],
      // repaired_by: [''],
      // date_of_resolution: [''],
      // notes: [''],
      role: [this._sharedService.role],
      role1: sessionStorage.getItem('roleadmin'),
      image: [''],
      deletedImages: [''],
    })
  }
  domainSelected(domain) {
    let info = '';
    this._sharedService.presentToast(domain.info, 'bottom');
  }
  ionViewDidEnter() {
    this.initializeItems();

    this.role = sessionStorage.getItem('roleadmin');
    console.log(this.role);
    this.domain_admin = sessionStorage.getItem('domain_admin');
    console.log(this.domain_admin);

    this.domains = AppSettings.domains;
    this.status = AppSettings.status;
    const _dateToIso = new DateToIso();
    this.images = [];
    this.editImages = [];
    if (this.navParams.data > 0) {
      this.did = this.navParams.data;
      if (this.did) {
        let load = this.loadingCtrl.create({
          spinner: 'circles',
          content: 'Loading Please Wait...',
          // dismissOnPageChange: true
        });
        load.present();
        this._apiService.callApi(AppSettings.getIssueApi, "post", { did: this.did }).subscribe(data => {
          load.dismiss();
          if (data.success) {
            let temp = data.data[0];
            this.issueForm.patchValue({
              did: this.did,
              domain: temp.domain,
              issue_desc: temp.issue_desc,
              location: temp.location,
              problem: temp.problem,
              raised_by: temp.raised_by,
              mobile: temp.mobile,
              reg_no: temp.reg_no,
              role: this._sharedService.role,
              image: temp.image,
              deletedImages: '',

            });
            console.log(this.did, 'test');

            this.tempPatch = {
              priority: temp.priority,
              raised_by: temp.raised_by,
              repaired_by: temp.repaired_by,
              repaired_on: temp.repaired_on != null ? _dateToIso.transform(temp.repaired_on, null) : '',
              date_of_resolution: temp.date_of_resolution,
              notes: temp.notes,
              status: temp.status
            };
            // console.log(this.tempPatch);
            // console.log("temp domain", temp.domain, this.domain_admin, (this.domain_admin && this.domain_admin.indexOf(temp.domain + ',') != -1));
            if (this._sharedService.roleadmin === 'stf' && (this._sharedService.domain_admin && this._sharedService.domain_admin.indexOf(temp.domain + ',') != -1)) {
            }
            // display images
            if (this.issueForm.controls['image'].value && this.issueForm.controls['image'].value.length) {
              this.issueForm.controls['image'].value.split(',').forEach(item => {
                this.editImages.push(AppSettings.imageUrl + item);
              });
            }
            console.log(JSON.stringify(this.issue));
          } else {
            this._sharedService.presentToast('Error retrieving data to edit');
          }
          //   // for admin, disable fields that are submitted by user
          if (this.issueForm.controls['reg_no'].value != this._sharedService.reg_no) {
            this.issueForm.controls['issue_desc'].disable();
            this.issueForm.controls['problem'].disable();
            this.issueForm.controls['location'].disable();
          }

        }, error => {
          load.dismiss();
          this._sharedService.presentToast('Server error: ' + error);
        });
      }
    }
  }
  public save() {
    // console.log("bcxjh",this._sharedService.mobile);
    console.log("in save");
    this.submitAttempt = true;
    // if admin, enable user fields for form submission
    if (this.issueForm.controls['reg_no'].value != this._sharedService.reg_no) {
      //this.issueForm.controls['domain'].enable();
      this.issueForm.controls['issue_desc'].enable();
      this.issueForm.controls['problem'].enable();
      this.issueForm.controls['location'].enable();
    }

    if (this.issueForm.valid) {

      if (this.issueForm.controls['did'].value > 0 && this.role === 'stf' && (this.domain_admin && this.domain_admin.indexOf(this.issueForm.controls['domain'].value + ',') == -1)) {
        // console.log("temp patch is", this.tempPatch)
        this.issueForm.patchValue(this.tempPatch);
      }

      // remove deleted images from issue.image
      if (this.issueForm.controls['deletedImages'].value && this.issueForm.controls['deletedImages'].value.length > 0 && this.issueForm.controls['did'].value > 0) {
        this.issueForm.controls['deletedImages'].value.split(',').forEach(item => {
          // this.issueForm.controls['image'].value= this.issueForm.controls['image'].value.replace(item, '');
          this.issueForm.patchValue({
            'image': this.issueForm.controls['image'].value.replace(item, '')
          });
        });
      }

      // remove extra commas
      if (this.issueForm.controls['image'].value && this.issueForm.controls['image'].value.length > 0) {
        // this.issueForm.controls['image'].value= this.issueForm.controls['image'].value.replace(/[, ]+/g, ',').trim();
        this.issueForm.patchValue({
          'image': this.issueForm.controls['image'].value.replace(/[, ]+/g, ',').trim()
        });

        if (this.issueForm.controls['image'].value.substr(0, 1) == ',') {
          // this.issueForm.controls['image'].value= this.issueForm.controls['image'].value.substr(1);
          this.issueForm.patchValue({
            'image': this.issueForm.controls['image'].value.substr(1)
          });
        }

        if (this.issueForm.controls['image'].value.substr(this.issueForm.controls['image'].value.length - 1, 1) == ',') {
          // this.issueForm.controls['image'].value= this.issueForm.controls['image'].value.substr(0, this.issueForm.controls['image'].value.length - 1);
          this.issueForm.patchValue({
            'image': this.issueForm.controls['image'].value.substr(0, this.issueForm.controls['image'].value.length - 1)
          });
        }
      }


      this.uploadImage();
    }

  }

  insertData(body) {

    let load = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...',
      // dismissOnPageChange: true
    })

    load.present();
    console.log(this.did);
    if (this.did > 0) {
      
      console.log(this.issueForm.value.status);
      
        let value = {};
        value['domain'] = this.issueForm.value.domain;
        value['issue_desc'] = this.issueForm.value.issue_desc;
        value['location'] = this.issueForm.value.location;
        value['problem'] = this.issueForm.value.problem;
        value['did'] = this.issueForm.controls['did'].value;
        this._apiService.callApi(AppSettings.modifyIssue, 'post', value)
          .subscribe(data => {
            if (this.did) {
              this._sharedService.presentToast('Issue updated successfully');
            }
            load.dismiss();
            this.navCtrl.setRoot(IssuesListPage);
          },
          error => {
            load.dismiss();
            this._sharedService.presentToast('Server error: ' + error);
          });
    }

    else {
      console.log('hui');
      this._apiService.callApi(AppSettings.INSERTISSUE, 'post', this.issueForm.value)
        .subscribe(data => {
          if (data) {
            this._sharedService.presentToast('Issue registered successfully');
          }
          load.dismiss();
          this.navCtrl.setRoot(IssuesListPage);
        },
        error => {
          load.dismiss();
          this._sharedService.presentToast('Server error: ' + error);
        });
    }
    // this._apiService.callApi(AppSettings.newIssueApi, 'post', body)
    //   .subscribe(data => {
    //     if (data.success) {
    //       if (this.did) {
    //         console.log(this.did, 'test');
    //         this._sharedService.presentToast('Issue updated successfully');
    //       }
    //       else {
    //         this._sharedService.presentToast('Issue registered successfully');
    //       }
    //       load.dismiss();
    //       this.navCtrl.setRoot(IssuesListPage);
    //     }
    //     if (this.issueForm.controls['reg_no'].value != this._sharedService.reg_no) {
    //       this.issueForm.controls['issue_desc'].disable();
    //       this.issueForm.controls['problem'].disable();
    //       this.issueForm.controls['location'].disable();
    //     }
    //   },

    //   error => {
    //     load.dismiss();
    //     this._sharedService.presentToast('Server error: ' + error);
    //   });



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

      if (this.issueForm.controls['did'].value > 0) {
        if (this.issueForm.controls['deletedImages'].value.length == 0) {
          // this.issueForm.controls['deletedImages'].value = temp.splice(i, 1).toString();

          this.issueForm.patchValue({
            'deletedImages': temp.splice(i, 1).toString()
          });

        } else {
          // this.issueForm['issue'].deletedImages = this.issueForm['issue'].deletedImages + ',' + temp.splice(i, 1).toString();

          this.issueForm.patchValue({
            'deletedImages': this.issueForm.controls['deletedImages'].value + ',' + temp.splice(i, 1).toString()
          });
        }

        // this.issueForm['issue'].deletedImages = this.issueForm['issue'].deletedImages.replace(AppSettings.imageUrl, '');
        this.issueForm.patchValue({
          'deletedImages': this.issueForm.controls['deletedImages'].value.replace(AppSettings.imageUrl, '')
        });

      } else {
        temp.splice(i, 1);
      }

      // remove server name from image
    }

    if (type === 'new') {
      // this.issueForm.controls['image'].value= this.issueForm.controls['image'].value.replace(image, '');

      this.issueForm.patchValue({
        'image': this.issueForm.controls['image'].value.replace(image, '')
      });
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

    if (!this.issueForm.controls['image'].value) {
      // this.issueForm.controls['image'].value= newFileName;
      this.issueForm.patchValue({
        image: newFileName
      });

    } else {
      // this.issueForm.controls['image'].value= this.issueForm.controls['image'].value+ ',' + newFileName;
      this.issueForm.patchValue({
        image: this.issueForm.controls['image'].value + ',' + newFileName
      });
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

    let p = Object.assign({}, this.issue, this.issueForm.value, this.role1);
    const body = { issue: p };
    this.insertData(body);
  }

  selStataus(event) {
    console.log(event);
    this.showdays = event;
    console.log(this.showdays);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  initializeItems() {
    const vals = {
      utype: 'adm',

    }
    this._apiService.callApi(AppSettings.getStaffData, 'post', vals).subscribe(dataa => {
      // console.log(dataa);
      for (var i = 0; i < dataa.data.data.length; i++) {
        this.items[i] = {};

        this.items[i]["id"] = dataa.data.data[i].reg_no;
        this.items[i]["itemName"] = dataa.data.data[i].reg_no + ' - ' + dataa.data.data[i].name;
        //  console.log( this.items);
      }
    });
  }
  selectItems(event) {
    console.log(event);
  }
}
