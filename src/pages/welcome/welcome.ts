import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppSettings } from '../app.settings';
import { RegisterPage, IssuesTabsPage } from '../pages';
import { ApiService, SharedService } from '../../common/common';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  mobile: string = '9885721144';
  password: string = '1234';

  constructor(public navCtrl: NavController, private _apiService: ApiService, private _sharedService: SharedService) {

  }

  ionViewWillEnter() {
    console.log("in ionViewWillEnter");
    console.log(this._sharedService.getStorage('loggedIn'));

    if (this._sharedService.getStorage('loggedIn')) {
      this.navCtrl.push(IssuesTabsPage);
    }
  }

  showRegister() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    let body = { mobile: this.mobile, password: this.password };
    this._apiService.callApi(AppSettings.loginApi, 'post', body).subscribe(data => {
      if (data.success) {
        this._sharedService.setStorage('loggedIn', true);
        this._sharedService.mobile = this.mobile;
        this._sharedService.name = data.data[0].name;
        this._sharedService.role = data.data[0].role;
        console.log(this._sharedService.role);

        // this._sharedService.presentToast('Login successful');
        this.navCtrl.push(IssuesTabsPage);
      } else {
        this._sharedService.presentToast(data.error);
      }
    })
  }
}
