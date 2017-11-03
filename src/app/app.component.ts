import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage, IssuesTabsPage } from '../pages/pages';
import { SharedService } from '../common/common';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = WelcomePage;
  role = sessionStorage.getItem('roleadmin');

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _sharedService: SharedService
  ) {
    this.initializeApp();
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
    // this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  logout() {
    console.log("logout clicked");  
    this.menu.close();  
    this._sharedService.clearStorage();
    // this.role='';    
    sessionStorage.clear();
    this.nav.setRoot(WelcomePage);
  }
  home()
  {
    this.menu.close();
    this.nav.setRoot(IssuesTabsPage);
  }

}
