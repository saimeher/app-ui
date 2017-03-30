import { Component } from '@angular/core';
// import { Sim } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import { AppSettings } from '../app.settings';
import { ApiService, SharedService } from '../../common/common';
import { IssueDetailPage, WelcomePage, NewIssuePage } from '../pages';

@Component({
  selector: 'issues-list-closed',
  templateUrl: 'issues-list-closed.html',
})
export class IssuesListClosedPage {
  categories = [];
  issuesList = [];
  display = false;

  constructor(private _apiService: ApiService, private _sharedService: SharedService, public navCtrl: NavController) {
  }

  ionViewWillEnter() {
    this.getIssuesList();
  }

  // get issues list to display as a list
  getIssuesList() {
    this._apiService.callApi(AppSettings.issuesListApi, 'post', { mobile: this._sharedService.mobile, role: this._sharedService.role, type: 'closed' })
      .subscribe(data => {
        if (data.success) {
          console.log(JSON.stringify(data.data));
          this.categories = [];
          this.issuesList = [];

          let category;
          data.data.forEach(item => {
            if (item['domain'] != category) {

              category = this._sharedService.categorySearch(item['domain'], AppSettings.domains).title;

              // category = item['domain'];
              this.categories.push(category);
              this.issuesList[category] = [];
              this.issuesList[category].push({ did: item.did, issue_desc: item.issue_desc });
            } else {
              this.issuesList[category].push({ did: item.did, issue_desc: item.issue_desc });
            }
          });
        }
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
