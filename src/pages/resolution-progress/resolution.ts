
import { ActionSheetController, NavController, NavParams } from 'ionic-angular';
// import { Sim } from 'ionic-native';
import { Component } from '@angular/core';
import { AppSettings } from '../app.settings';
import { SharedService, ApiService } from '../../common/common';
import { NewIssuePage, CaretakeradminPage, ResolutionProgressPage } from '../pages';
import { LoadingController } from 'ionic-angular'

@Component({
  selector: 'resolution',
  templateUrl: 'resolution.html',

})
export class ResolutionPage {
  issue;
  did;
  keys;
  images: Array<any> = [];
  domains;
  status;
  role;
  type;
  constructor(
    private _apiService: ApiService,
    private _sharedService: SharedService,
    private navCtrl: NavController,
    private navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController
  ) {
    this.domains = AppSettings.domains;
    this.status = AppSettings.status;
  }

  ionViewDidEnter() {
    this.did = this.navParams.get('did');
    this.type = this.navParams.get('type');
    let load = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading Please Wait...',
      // dismissOnPageChange: true

    })
    this.role = sessionStorage.getItem('roleadmin');
    console.log(this.role);
    console.log(this.type);
    load.present();
    this._apiService.callApi(AppSettings.getIssueApi, 'post', { did: this.did })
      .subscribe(data => {
        if (data.success) {
          console.log(JSON.stringify(data.data));
          this.issue = data.data[0];
          this.issue.image = this.issue.image;
          this.keys = Object.keys(this.issue);

          if (this.issue.image && this.issue.image.length) {
            this.issue.image.split(',').forEach(item => {
              this.images.push(AppSettings.imageUrl + item);
            });
          }
        }
        load.dismiss();

      }, error => {
        load.dismiss();
        this._sharedService.presentToast('Server error: ' + error);
      });
  }

  edit() {
    console.log(this.type);
    // this.navCtrl.push(ResolutionProgressPage, this.did);
    this.navCtrl.push(ResolutionProgressPage, this.did, this.type);
    
  }

  delete(status) {
    let load = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...',
      // dismissOnPageChange: true
    })
    load.present();

    this._apiService.callApi(AppSettings.deleteApi, 'post', { did: this.did, mobile: this._sharedService.mobile, status: status }).subscribe(data => {
      load.dismiss();
      if (data.success) {
        this._sharedService.presentToast('Issue deleted successfully');
        this.navCtrl.pop();
      } else {
        this._sharedService.presentToast('Error: ' + data.error);
      }

    }, error => {
      load.dismiss();
      this._sharedService.presentToast('Server error: ' + error);
    });

  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Delete Issue',
      buttons: [
        {
          text: 'Issue got resolved?',
          role: 'destructive',
          handler: () => {
            this.delete('user_resolved');
          }
        }, {
          text: 'No more an issue?',
          role: 'destructive',
          handler: () => {
            this.delete('user_deleted');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
