import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { WelcomePage, RegisterPage, NewIssuePage, IssuesListPage, IssueDetailPage, IssuesTabsPage, IssuesListClosedPage, IssuesListInProgressPage,IssuesListUsdeletedPage,IssuesListVerifiedPage,IssuesListCannotbePage,IssuesListAssignedPage,IssuesListOnholdPage,CaretakeradminPage,CaretakerlistPage,ResolutionProgressPage,ResolutionPage,PendingListPage, ClosedListPage } from '../pages/pages';
import { ApiService, DeviceService, SharedService, DateToIso } from '../common/common';
import { UploadService } from '../common/uploadservice';


@NgModule({
  declarations: [
    MyApp,
    RegisterPage,
    WelcomePage,
    IssuesListPage,
    NewIssuePage,
    IssueDetailPage,
    IssuesTabsPage,
    IssuesListClosedPage,
    IssuesListInProgressPage,
    IssuesListUsdeletedPage,
    IssuesListVerifiedPage,
    IssuesListCannotbePage,
    IssuesListAssignedPage,
    IssuesListOnholdPage,
    CaretakeradminPage,
    CaretakerlistPage,
    ResolutionProgressPage,
    ResolutionPage,
    PendingListPage,
ClosedListPage,

    DateToIso
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    RegisterPage,
    IssuesListPage,
    NewIssuePage,
    IssueDetailPage,
    IssuesTabsPage,
    IssuesListClosedPage,
    IssuesListInProgressPage,
    IssuesListUsdeletedPage,
    IssuesListVerifiedPage,
    IssuesListCannotbePage,
    IssuesListAssignedPage,
    IssuesListOnholdPage,
    CaretakeradminPage,
    CaretakerlistPage,
    ResolutionPage,
    ResolutionProgressPage,
    PendingListPage,
    ClosedListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiService,
    DeviceService,
    SharedService,
    UploadService,
  ]
})
export class AppModule { }
