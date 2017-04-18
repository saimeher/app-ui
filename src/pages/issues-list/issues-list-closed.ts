import { Component } from '@angular/core';
// import { Sim } from 'ionic-native';
import { NavController } from 'ionic-angular';


import { AppSettings } from '../app.settings';
import { ApiService, SharedService } from '../../common/common';
import { IssueDetailPage, NewIssuePage } from '../pages';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'issues-list-closed',
  templateUrl: 'issues-list-closed.html',
})
export class IssuesListClosedPage {
  categories = [];
  issuesList = [];
  display = false;
  collapse: string;

  constructor(private _apiService: ApiService, private _sharedService: SharedService, public navCtrl: NavController, private loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
    this.getIssuesList();
  }

  // get issues list to display as a list
  getIssuesList() {
    let load = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...',
      // dismissOnPageChange: true
    })
    load.present();
    this._apiService.callApi(AppSettings.issuesListApi, 'post', { mobile: this._sharedService.mobile, role: this._sharedService.role, type: 'closed' })
      .subscribe(data => {
        if (data.success) {
          console.log(JSON.stringify(data.data));
          this.categories = [];
          this.issuesList = [];

          let category;
          let categoryTitle;

          data.data.forEach(item => {
            if (item['domain'] != category) {
              category = item['domain'];
              categoryTitle = this._sharedService.categorySearch(item['domain'], AppSettings.domains).title;
              if (!this.collapse) {
                console.log("here" + categoryTitle);

                this.collapse = categoryTitle;
              }
              // category = item['domain'];
              this.categories.push(categoryTitle);
              this.issuesList[categoryTitle] = [];
              this.issuesList[categoryTitle].push({ did: item.did, issue_desc: item.issue_desc });
            } else {
              this.issuesList[categoryTitle].push({ did: item.did, issue_desc: item.issue_desc });
            }
          });
        }
        load.dismiss();
      }, error => {
        load.dismiss();
        this._sharedService.presentToast('Server error: ' + error);
      });
  }

  issueSelected(issue) {
    this.display = !this.display;
    this.navCtrl.push(IssueDetailPage, {
      did: issue.did
    });
  }

  showNewIssue() {


    this.navCtrl.push(NewIssuePage);
  }


}
