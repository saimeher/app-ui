import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import { AppSettings } from '../app.settings';
import { ApiService, SharedService } from '../../common/common';
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
