import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { WelcomePage, RegisterPage, NewIssuePage, IssuesListPage, IssueDetailPage, IssuesTabsPage, IssuesListClosedPage } from '../pages/pages';
import { ApiService, DeviceService, SharedService, DateToIso } from '../common/common';

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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiService,
    DeviceService,
    SharedService
  ]
})
export class AppModule { }