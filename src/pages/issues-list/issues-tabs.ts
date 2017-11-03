import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { AppSettings } from '../app.settings';
import { ActionSheetController, NavController } from 'ionic-angular';
import { NewIssuePage, IssuesListInProgressPage, ClosedListPage, PendingListPage ,IssuesListPage} from '../pages';
import { SharedService, ApiService } from '../../common/common';


@Component({
  selector: 'issues',
  templateUrl: 'issues-tabs.html',
})
export class IssuesTabsPage {
  @ViewChild(Nav) nav: Nav;
  reg_no = '';
  total;
  total1;
  verified_resolved_tot;
  resolution_in_progress_tot;
  pending_tot;
  user_deleted_tot;
  cannot_be_resolved_tot;
  assigned_tot;
  onhold_tot;
  closed_tot;
  verified_resolved_tot1;
  resolution_in_progress_tot1;
  pending_tot1;
  user_deleted_tot1;
  cannot_be_resolved_tot1;
  assigned_tot1;
  onhold_tot1;
  closed_tot1;
  data2;
  data;
  data4;
  pen:number;
  pen1:number;
  pen2:number;
  pending:number;
  assigned:number;
  onhold:number;
  resolution:number;
  closed1:number;
  verified:number;
  cannot:number;
  user_deleted:number;

  role = sessionStorage.getItem('roleadmin');
  // tabAssigned = IssuesListAssignedPage;
  // tabPending = IssuesListPage;

  // tabOnhold = IssuesListOnholdPage;
  // tabInProgress = IssuesListInProgressPage;
  constructor(private _apiService: ApiService, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, private _sharedService: SharedService) {
  }

  // presentActionSheet() {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: ' Issues Closed',
  //     buttons: [
  //       {
  //         text: 'User Deleted',
  //         role: 'destructive',
  //         handler: () => {
  //           // this.delete('user_resolved');
  //           this.navCtrl.push(IssuesListUsdeletedPage);
  //         }
  //       }, {
  //         text: 'Cannot be Resolved',
  //         role: 'destructive',
  //         handler: () => {
  //           this.navCtrl.push(IssuesListCannotbePage);
  //         }
  //       },
  //       {
  //         text: 'Closed',
  //         role: 'Archive',
  //         handler: () => {
  //           this.navCtrl.push(IssuesListClosedPage);
  //         }
  //       },
  //       {
  //         text: 'Verified & resolved',
  //         role: 'Archive',
  //         handler: () => {
  //           this.navCtrl.push(IssuesListVerifiedPage);
  //         }
  //       },

  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }

  ionViewDidEnter() {
    this.count();
  }

  pendinglist() {
    console.log('bdfhbsd');
    this.navCtrl.push(PendingListPage);
  }
  showNewIssue() {
    this.navCtrl.push(NewIssuePage);

  }
  inprogress() {
    this.navCtrl.push(IssuesListInProgressPage);
  }
  closed() {
    this.navCtrl.push(ClosedListPage);
  }
  function()
{
  this.navCtrl.push(IssuesListPage);
}


  count()
   {
    if(this.role =='stf'){
      this.verified_resolved_tot = '0';
      this.resolution_in_progress_tot = '0';
      this.pending_tot = '0';
      this.user_deleted_tot = '0';
      this.cannot_be_resolved_tot = '0';
      this.assigned_tot = '0';
      this.onhold_tot = '0';
      this.closed_tot='0';
      this.verified_resolved_tot1 = '0';
      this.resolution_in_progress_tot1= '0';
      this.pending_tot1 = '0';
      this.user_deleted_tot1 = '0';
      this.cannot_be_resolved_tot1 = '0';
      this.assigned_tot1 = '0';
      this.onhold_tot1 = '0';
      this.closed_tot1='0';
    this._apiService.callApi(AppSettings.getdetails, 'post', { reg_no: this._sharedService.reg_no }).subscribe(alldata => {
      if (alldata) {
        console.log(alldata.data);
        console.log(alldata.data1);
        this.data2 = alldata.data1;
        this.data4 =alldata.data4;
        this.data = alldata.data;
         console.log(this.data4);
        this.data2.forEach(element => {
          this.total = element.t;
          if (element.status == 'cannot_be_resolved') {
            this.cannot_be_resolved_tot = element.tot;
          }
          if (element.status == 'pending') {
            this.pending_tot = element.tot;
          }
          if (element.status == 'resolution_in_progress') {
            this.resolution_in_progress_tot = element.tot;
          }
          if (element.status == 'user_deleted') {
            this.user_deleted_tot = element.tot;
          }
          if (element.status == 'verified_resolved') {
            this.verified_resolved_tot = element.tot;
          }
          if (element.status == 'assigned') {
            this.assigned_tot = element.tot;
          }
          if (element.status == 'onhold') {
            this.onhold_tot = element.tot;
          }
          if (element.status == 'closed') {
            this.closed_tot = element.tot;
          }
          console.log(element.status, '-', element.tot);

        });
        this.data4.forEach(element => {
          this.total1= element.t;
          if (element.status == 'cannot_be_resolved') {
            this.cannot_be_resolved_tot1 = element.tot;
          }
          if (element.status == 'pending') {
            this.pending_tot1 = element.tot;
          }
          if (element.status == 'resolution_in_progress') {
            this.resolution_in_progress_tot1 = element.tot;
          }
          if (element.status == 'user_deleted') {
            this.user_deleted_tot1 = element.tot;
          }
          if (element.status == 'verified_resolved') {
            this.verified_resolved_tot1 = element.tot;
          }
          if (element.status == 'assigned') {
            this.assigned_tot1 = element.tot;
          }
          if (element.status == 'onhold') {
            this.onhold_tot1 = element.tot;
          }
          if (element.status == 'closed') {
            this.closed_tot1 = element.tot;
          }
          console.log(element.status, '-', element.tot);

        });
        this.pen = parseInt(this.pending_tot) + parseInt(this.pending_tot1) + parseInt(this.assigned_tot) + parseInt(this.assigned_tot1) + parseInt(this.onhold_tot) + parseInt(this.onhold_tot1);
        this.pen1 = parseInt(this.resolution_in_progress_tot) + parseInt(this.resolution_in_progress_tot1);
        this.pen2 = parseInt(this.user_deleted_tot) + parseInt(this.user_deleted_tot1) + parseInt(this.closed_tot) + parseInt(this.closed_tot1) + parseInt(this.verified_resolved_tot) + parseInt(this.verified_resolved_tot1) + parseInt(this.cannot_be_resolved_tot) + parseInt(this.cannot_be_resolved_tot1);
        let n =typeof(this.pen);
        this.pending = parseInt(this.pending_tot) +  parseInt(this.pending_tot1);
        this.assigned =parseInt(this.assigned_tot) + parseInt(this.assigned_tot1);
        this.onhold = parseInt(this.onhold_tot) + parseInt(this.onhold_tot1);
        this.resolution =parseInt(this.resolution_in_progress_tot) + parseInt(this.resolution_in_progress_tot1);
       this.user_deleted = parseInt(this.user_deleted_tot) + parseInt(this.user_deleted_tot1);
       this.cannot =  parseInt(this.cannot_be_resolved_tot) + parseInt(this.cannot_be_resolved_tot1);
       this.closed1 = parseInt(this.closed_tot) + parseInt(this.closed_tot1);
       this.verified =parseInt(this.verified_resolved_tot) + parseInt(this.verified_resolved_tot1);
        // +  parseInt(this.pending_tot1) + parseInt(this.assigned_tot);
        console.log(this.pen,n,'test');
    }
    });
  }
}
}

