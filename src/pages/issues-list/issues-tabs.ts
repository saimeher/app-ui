import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { ActionSheetController, NavController, NavParams } from 'ionic-angular';
import { IssuesListPage, IssuesListInProgressPage, IssuesListClosedPage, IssuesListUsdeletedPage, IssuesListVerifiedPage, IssuesListCannotbePage, IssuesListAssignedPage, IssuesListOnholdPage } from '../pages';

@Component({
  selector: 'issues',
  templateUrl: 'issues-tabs.html',
})
export class IssuesTabsPage {
  @ViewChild(Nav) nav: Nav;
  tabPending = IssuesListPage;
  tabAssigned = IssuesListAssignedPage;
  tabOnhold = IssuesListOnholdPage;
  // tabClosed = IssuesListClosedPage;
  tabInProgress = IssuesListInProgressPage;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: ' Issues Closed',
      buttons: [
        {
          text: 'User Deleted',
          role: 'destructive',
          handler: () => {
            // this.delete('user_resolved');
            this.navCtrl.push(IssuesListUsdeletedPage);
          }
        }, {
          text: 'Cannot be Resolved',
          role: 'destructive',
          handler: () => {
            this.navCtrl.push(IssuesListCannotbePage);
          }
        },
        {
          text: 'Closed',
          role: 'Archive',
          handler: () => {
            this.navCtrl.push(IssuesListClosedPage);
          }
        },
        {
          text: 'Verified & resolved',
          role: 'Archive',
          handler: () => {
            this.navCtrl.push(IssuesListVerifiedPage);
          }
        },

        {
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
