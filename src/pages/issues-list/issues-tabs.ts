import { Component } from '@angular/core';
import { IssuesListClosedPage, IssuesListPage } from '../pages';

@Component({
    selector: 'issues',
    templateUrl: 'issues-tabs.html',
})
export class IssuesTabsPage {
    tabPending = IssuesListPage;
    tabClosed = IssuesListClosedPage;

    constructor() {
    }


}
