import { ActionSheetController, NavController, NavParams,AlertController} from 'ionic-angular';
// import { Sim } from 'ionic-native';
import { Component } from '@angular/core';
import { AppSettings } from '../app.settings';
import { SharedService, ApiService } from '../../common/common';
import { NewIssuePage } from '../pages';

import { LoadingController} from 'ionic-angular'

@Component({
  selector: 'page-new-detail',
  templateUrl: 'issue-detail.html',

})
export class IssueDetailPage {
  issue;
  did;
  keys;
  images: Array<any> = [];
  domains;
  status;
  role;
  assigned_to='';
  cannottext='';
  resolution='';
  notes='';
  assignedon='';
  on='';


  constructor(
    private _apiService: ApiService,
    private _sharedService: SharedService,
    private navCtrl: NavController,
    private navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl:LoadingController,
    private alertCtrl: AlertController
  ) {
    this.domains = AppSettings.domains;
    this.status = AppSettings.status;
  }

  ionViewDidEnter() {
    this.did = this.navParams.get('did');

     let load = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading Please Wait...',
      // dismissOnPageChange: true
      
    })
     this.role = sessionStorage.getItem('roleadmin');
    console.log(this.role);
    load.present();
    this._apiService.callApi(AppSettings.getIssueApi, 'post', { did: this.did })
      .subscribe(data => {
        if (data.success) {
         console.log(data);
          this.issue = data.data[0];
          this.issue.image = this.issue.image;
          this.keys = Object.keys(this.issue);
          this.assigned_to =  data.data[0].repaired_name;
          this.cannottext = data.data[0].cannottext;
          this.notes = data.data[0].notes;
          this.resolution = data.data[0].date_of_resolution;
          this.assignedon = data.data[0].assigned_on;
          this.on=data.data[0].repaired_on;
          
           console.log(this.assigned_to);

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
    this.navCtrl.push(NewIssuePage, this.did);

    // this.navCtrl.push(CaretakeradminPage,this.did);
  }

  delete() {
     let load = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...',
      // dismissOnPageChange: true
    })
    load.present();

    this._apiService.callApi(AppSettings.deleteApi, 'post', { did: this.did}).subscribe(data => {
      load.dismiss();
      if (data) {
        this._sharedService.presentToast('Issue deleted successfully');
        this.navCtrl.pop();
      } 
      else {
        this._sharedService.presentToast('Error: ' + data.error);
      }

    }, error => {
        load.dismiss();
        this._sharedService.presentToast('Server error: ' + error);
      });

  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you want to delete this issue?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.delete();
          }
        }
      ]
    });
    alert.present();
  }
}
