import { Component } from '@angular/core';
// import { Sim } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { AppSettings } from '../app.settings';
import { ApiService, SharedService } from '../../common/common';
import { IssueDetailPage,ResolutionPage,CaretakerlistPage } from '../pages';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'issues-list-assigned',
  templateUrl: 'issues-list-assigned.html',
  
})
export class IssuesListAssignedPage {
  categories = [];
  issuesList = [];
  display = false;
  count='';
  collapse: string;
  collapse1: string;
  collapse2: string;
  issueCount: number;
  issueCount1:number;
  issueCount3:number;
  type1 : string= 'assigned';
  refresher;
  issuesListlength=0;
  issuesListlength1=0;
  issuesListlength2=0;


  categories1 = [];
  issuesList1 = [];

  categories2 = [];
  issuesList2 = [];
  role = sessionStorage.getItem('roleadmin');

  constructor(private _apiService: ApiService, private _sharedService: SharedService, public navCtrl: NavController, public loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {

    console.log('listpage')
    console.log('test', this._sharedService.getStorage('domain_admin'));
    this.collapse = '';
    this.collapse1 = '';
    this.collapse2 = '';
    this.getIssuesList();
    this.getissuesforuser();
    this. Resolutionprogress();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.getIssuesList();
    this.getissuesforuser();
    this.Resolutionprogress();
  }

  // get issues list to display as a list
  getIssuesList() {
    let load = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...',
    })
    load.present();
    this._apiService.callApi(AppSettings.getissuesforuser, 'post', { reg_no: this._sharedService.reg_no, type: 'assigned' })
      .subscribe(data => {
        if (data.success) {
          this.categories = [];
          this.issuesList = [];
          let category;
          let categoryTitle;
          this.issueCount = data.data1.length;
          data.data1.forEach(item => {
            if (item['domain'] != category) {
              category = item['domain'];
              categoryTitle = this._sharedService.categorySearch(item['domain'], AppSettings.domains).title;
              this.categories.push(categoryTitle);
              this.issuesList[categoryTitle] = [];
              this.issuesList[categoryTitle].push({ did: item.did, issue_desc: item.issue_desc });
            } else {
              this.issuesList[categoryTitle].push({ did: item.did, issue_desc: item.issue_desc });
            }
          this.issuesListlength= this.issuesList[categoryTitle].length;
          });
        }
        load.dismiss();

        if (this.refresher) {
          this.refresher.complete();
        }
      }, error => {
        load.dismiss();
        if (this.refresher) {
          this.refresher.complete();
        }
        this._sharedService.presentToast('Server error: ' + error);
      });
  }
  issueSelected(issue) {
    this.display = !this.display;
    this.navCtrl.push(IssueDetailPage, {
      did: issue.did
    });
  }
  collapseCategory(category) {
    if (this.collapse == category) {
      this.collapse = '';
    } else {
      this.collapse = category;
    }
  }
  

  // Issues raised by me 
  getissuesforuser() {
    console.log('username is', this._sharedService.reg_no);
    this._apiService.callApi(AppSettings.issuesListApi, 'post', { reg_no: this._sharedService.reg_no, role: this._sharedService.role, type: 'assigned' })

      .subscribe(data => {
        console.log(data);
        if (data.success) {
          console.log(JSON.stringify(data.data));
          this.categories1 = [];
          this.issuesList1 = [];
          let category1;
          let categoryTitle1;
          this.issueCount1 = data.data.length;
          // console.log(this.issueCount);
          console.log(data);
          //  this._sharedService.presentToast(this.issueCount1 + ' Issues pending', 'bottom', 1000);
          data.data.forEach(item => {
            if (item['domain'] != category1) {
              category1 = item['domain'];
              categoryTitle1 = this._sharedService.categorySearch(item['domain'], AppSettings.domains).title;
              this.categories1.push(categoryTitle1);
              this.issuesList1[categoryTitle1] = [];
              this.issuesList1[categoryTitle1].push({ did: item.did, issue_desc: item.issue_desc });
            } else {
              this.issuesList1[categoryTitle1].push({ did: item.did, issue_desc: item.issue_desc });
            }
            this.issuesListlength1= this.issuesList1[categoryTitle1].length;
          });
          console.log(this.issuesList1);
        }
        // load.dismiss();

        if (this.refresher) {
          this.refresher.complete();
        }
      }, error => {
        // load.dismiss();
        if (this.refresher) {
          this.refresher.complete();
        }
        this._sharedService.presentToast('Server error: ' + error);
      });
  }
  issueSelected1(issue1) {
    this.display = !this.display;
    this.navCtrl.push(CaretakerlistPage,{
      did: issue1.did,
      type:this.type1
    });
  }
  collapseCategory1(category1) {
    if (this.collapse1 == category1) {
      this.collapse1  = '';
    } else {
      this.collapse1 = category1;
    }
  }


  Resolutionprogress() {
    // let load = this.loadingCtrl.create({
    //   spinner: 'hide',
    //   content: 'Loading Please Wait...',
    // })
    // load.present();
    this._apiService.callApi(AppSettings.Toresolutionprogress, 'post', { reg_no: this._sharedService.reg_no, type: 'assigned' })
      .subscribe(data => {
        console.log(data);
        if (data.success) {
          this.categories2 = [];
          this.issuesList2 = [];
          let category2;
          let categoryTitle2;
          console.log(data.data1);
          this.issueCount3 = data.data1.length;
          data.data1.forEach(item => {
            if (item['domain'] != category2) {
              category2 = item['domain'];
              categoryTitle2 = this._sharedService.categorySearch(item['domain'], AppSettings.domains).title;
              this.categories2.push(categoryTitle2);
              console.log(this.categories2);
              this.issuesList2[categoryTitle2] = [];
              this.issuesList2[categoryTitle2].push({ did: item.did, issue_desc: item.issue_desc });
            } else {
              this.issuesList2[categoryTitle2].push({ did: item.did, issue_desc: item.issue_desc });
            }
            
             this.issuesListlength2= this.issuesList2[categoryTitle2].length;
          });
        }
        // load.dismiss();

        if (this.refresher) {
          this.refresher.complete();
        }
      }, error => {
        // load.dismiss();
        if (this.refresher) {
          this.refresher.complete();
        }
        this._sharedService.presentToast('Server error: ' + error);
      });
  }
  issueSelected2(issue2) {
    this.display = !this.display;
    this.navCtrl.push(ResolutionPage, {
      did: issue2.did,
      type : this.type1
    });
  }
  collapseCategory2(category2) {
    console.log('gxsdm');
    if (this.collapse2 == category2) {
      this.collapse2 = '';
    } else {
      this.collapse2 = category2;
    }
  }
}