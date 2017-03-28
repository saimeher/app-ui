import { Component } from '@angular/core';
import { Sim } from 'ionic-native';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { AppSettings } from '../app.settings';
import { SharedService, ApiService } from '../../common/common';
import { NewIssuePage } from '../pages';

@Component({
  selector: 'page-new-detail',
  templateUrl: 'issue-detail.html'
})
export class IssueDetailPage {
  issue;
  did;
  keys;
  images: Array<any> = [];

  constructor(private _apiService: ApiService, private _sharedService: SharedService, private navCtrl: NavController, private navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.did = this.navParams.get('did');
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
      });
  }

  edit() {
    this.navCtrl.push(NewIssuePage, this.did);
  }

  delete() {
    this._apiService.callApi(AppSettings.deleteApi, 'post', { did: this.did, mobile: this._sharedService.mobile }).subscribe(data => {
      if (data.success) {
        this._sharedService.presentToast('Issue deleted successfully');
        this.navCtrl.pop();
      } else {
        this._sharedService.presentToast('Error: ' + data.error);
      }
    });
  }

}
