import { Component } from '@angular/core';
import { IssuesListClosedPage, IssuesListPage, IssuesListInProgressPage } from '../pages';

@Component({
    selector: 'issues',
    templateUrl: 'issues-tabs.html',
})
export class IssuesTabsPage {
    tabPending = IssuesListPage;
    tabClosed = IssuesListClosedPage;
    tabInProgress = IssuesListInProgressPage;

    constructor() {
    }


}
