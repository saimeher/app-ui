import { Component } from '@angular/core';
// import { Sim } from 'ionic-native';
import { NavController } from 'ionic-angular';


import { AppSettings } from '../app.settings';
import { ApiService, SharedService } from '../../common/common';
import { IssueDetailPage, NewIssuePage } from '../pages';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'issues-list-inprogress',
  templateUrl: 'issues-list-inprogress.html',
})
export class IssuesListInProgressPage {
  categories = [];
  issuesList = [];
  display = false;
  collapse: string;
  issueCount: number;
  refresher;

  constructor(private _apiService: ApiService, private _sharedService: SharedService, public navCtrl: NavController, private loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
    this.collapse = '';
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
    this._apiService.callApi(AppSettings.issuesListApi, 'post', { mobile: this._sharedService.mobile, role: this._sharedService.role, type: 'in_progress' })
      .subscribe(data => {
        if (data.success) {
          console.log(JSON.stringify(data.data));
          this.categories = [];
          this.issuesList = [];

          let category;
          let categoryTitle;

          this.issueCount = data.data.length;
          this._sharedService.presentToast(this.issueCount + ' Issues in progress', 'bottom', 1000);


          data.data.forEach(item => {
            if (item['domain'] != category) {
              category = item['domain'];
              categoryTitle = this._sharedService.categorySearch(item['domain'], AppSettings.domains).title;
              // if (!this.collapse) {
              //   console.log("here" + categoryTitle);

              //   this.collapse = categoryTitle;
              // }
              // category = item['domain'];
              this.categories.push(categoryTitle);
              this.issuesList[categoryTitle] = [];
              this.issuesList[categoryTitle].push({ did: item.did, issue_desc: item.issue_desc });
            } else {
              this.issuesList[categoryTitle].push({ did: item.did, issue_desc: item.issue_desc });
            }
          });
        }
        if (this.refresher) {
          this.refresher.complete();
        }
        load.dismiss();
      }, error => {
        if (this.refresher) {
          this.refresher.complete();
        }
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

  collapseCategory(category) {
    if (this.collapse == category) {
      this.collapse = '';
    } else {
      this.collapse = category;
    }
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.getIssuesList();
  }

}
