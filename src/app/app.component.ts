import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage, NewIssuePage, IssuesListPage } from '../pages/pages';
import { DeviceService } from '../common/common';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = WelcomePage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _deviceService: DeviceService
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      // { title: 'Hello Ionic', component: HelloIonicPage },
      // { title: 'My First List', component: ListPage }
      { title: 'Register an Issue', component: NewIssuePage },
      { title: 'Issues List', component: IssuesListPage }
    ];
  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }


}
