import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppSettings } from '../app.settings';
import { RegisterPage, IssuesTabsPage } from '../pages';
import { ApiService, SharedService } from '../../common/common';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  mobile: string = '9703400284';
  password: string = '1234';

  constructor(public navCtrl: NavController, private _apiService: ApiService, private _sharedService: SharedService, public loadingCtrl: LoadingController) {

  }

  ionViewWillEnter() {
    console.log("in ionViewWillEnter");

    // if (this._sharedService.getStorage('loggedIn')) {
    //   this.navCtrl.setRoot(IssuesTabsPage);
    // }

    this._sharedService.getStorage('loggedIn').subscribe(data => {
      console.log('loggedin data is', data);

      if (data == true) {
        console.log('here');

        Observable.forkJoin([
          this._sharedService.getStorage('name'),
          this._sharedService.getStorage('mobile'),
          this._sharedService.getStorage('role')
        ]
        ).subscribe(dataArray => {
          this._sharedService.name = dataArray[0].toString();
          this._sharedService.mobile = dataArray[1].toString();
          this._sharedService.role = dataArray[2].toString();
          this.navCtrl.setRoot(IssuesTabsPage);
        })
      }
    })
  }

  showRegister() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    let body = { mobile: this.mobile, password: this.password };
    // spiner code
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...',
      dismissOnPageChange: true
    }).present();

   

    // setTimeout(() => {
    //   this.navCtrl.setRoot(IssuesTabsPage);
    // }, 1000);

    // setTimeout(() => {
    //   loading.dismiss();
    // }, 5000);

    this._apiService.callApi(AppSettings.loginApi, 'post', body).subscribe(data => {
      if (data.success) {
        this._sharedService.setStorage('loggedIn', true);
        this._sharedService.setStorage('mobile', this.mobile);
        this._sharedService.setStorage('name', data.data[0].name);
        this._sharedService.setStorage('role', data.data[0].role);

        this._sharedService.name = this.mobile;
        this._sharedService.mobile = data.data[0].name;
        this._sharedService.role = data.data[0].role;

        // this._sharedService.presentToast('Login successful');
        // this.navCtrl.push(IssuesTabsPage);
        this.navCtrl.setRoot(IssuesTabsPage);
      } else {
        this._sharedService.presentToast(data.error);
      }
    })
  }

//   presentLoadingText() {
//     let loading = this.loadingCtrl.create({
//       spinner: 'hide',
//       content: 'Loading Please Wait...'
//     });

//     loading.present();

//     setTimeout(() => {
//       this.navCtrl.setRoot(IssuesTabsPage);
//     }, 1000);

//     setTimeout(() => {
//       loading.dismiss();
//     }, 5000);
//   }
 }
