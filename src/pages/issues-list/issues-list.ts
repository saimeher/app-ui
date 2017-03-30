import { Component } from '@angular/core';
// import { Sim } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import { AppSettings } from '../app.settings';
import { ApiService, SharedService } from '../../common/common';
import { IssueDetailPage, WelcomePage, NewIssuePage } from '../pages';

@Component({
  selector: 'issues-list',
  templateUrl: 'issues-list.html',
})
export class IssuesListPage {
  categories = [];
  issuesList = [];
  display = false;

  constructor(private _apiService: ApiService, private _sharedService: SharedService, public navCtrl: NavController) {
  }

  ionViewDidEnter() {
    this.getIssuesList();
  }

  // get issues list to display as a list
  getIssuesList() {
    console.log('mobile is', this._sharedService.mobile);
    
    this._apiService.callApi(AppSettings.issuesListApi, 'post', { mobile: this._sharedService.mobile, role: this._sharedService.role, type: 'pending' })
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

              // category = item['domain'];
              this.categories.push(categoryTitle);
              this.issuesList[categoryTitle] = [];
              this.issuesList[categoryTitle].push({did: item.did, issue_desc: item.issue_desc});
            } else {
              this.issuesList[categoryTitle].push({did: item.did, issue_desc: item.issue_desc});
            }
            
          });

          console.log(this.issuesList);
          

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
