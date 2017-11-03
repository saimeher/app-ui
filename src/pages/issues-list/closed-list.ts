import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { ActionSheetController, NavController } from 'ionic-angular';
import { IssuesListClosedPage, IssuesListUsdeletedPage, IssuesListVerifiedPage, IssuesListCannotbePage } from '../pages';

@Component({
  selector: 'closed-list',
  templateUrl: 'closed-list.html',
})
export class ClosedListPage {
  user_deleted = IssuesListUsdeletedPage;
  cannot_be_resolved = IssuesListCannotbePage;
  closedissue = IssuesListClosedPage;
  verified_resolved = IssuesListVerifiedPage;
  //   tabInProgress = IssuesListInProgressPage;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public menu: MenuController) {
  }
  ionViewDidEnter() {
    this.menu.close()
  }

}