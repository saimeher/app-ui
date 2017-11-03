import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { ActionSheetController, NavController } from 'ionic-angular';
import { IssuesListPage, IssuesListAssignedPage, IssuesListOnholdPage } from '../pages';

@Component({
  selector: 'pending-list',
  templateUrl: 'pending-list.html',
})
export class PendingListPage {
  tabPending = IssuesListPage;
  tabAssigned = IssuesListAssignedPage;
  tabOnhold = IssuesListOnholdPage;
//   tabInProgress = IssuesListInProgressPage;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController,public menu: MenuController) {
  }
  ionViewDidEnter()
  {
    this.menu.close()
  }
}
