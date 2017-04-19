import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { AppSettings } from '../app.settings';
import { RegisterPage, IssuesTabsPage } from '../pages';
import { ApiService, SharedService } from '../../common/common';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
  styles: [`

        .invalid {
            border-top: 1px dotted #ea6153;
            border-right: 1px dotted #ea6153;
        }
  `]
})
export class WelcomePage {
  loginForm: FormGroup;
  submitAttempt = false;
  forgotPassword = false;

  constructor(public navCtrl: NavController, private _apiService: ApiService, private _sharedService: SharedService, public loadingCtrl: LoadingController, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidEnter() {

    // if (this._sharedService.getStorage('loggedIn')) {
    //   this.navCtrl.setRoot(IssuesTabsPage);
    // }
    // let load = this.loadingCtrl.create({
    //   spinner: 'circles',
    //   content: 'Loading Please Wait...',
    // });
    // load.present();
    this._sharedService.getStorage('loggedIn').subscribe(data => {
      // load.dismiss();
      if (data == true) {
        Observable.forkJoin([
          this._sharedService.getStorage('name'),
          this._sharedService.getStorage('mobile'),
          this._sharedService.getStorage('role'),
          this._sharedService.getStorage('domain_admin'),
        ]
        ).subscribe(dataArray => {
          this._sharedService.name = dataArray[0].toString();
          this._sharedService.mobile = dataArray[1].toString();
          this._sharedService.role = dataArray[2].toString();
          this._sharedService.domain_admin = dataArray[3].toString();
          this.navCtrl.setRoot(IssuesTabsPage);
        })
      }

    }, error => {
      // load.dismiss();
      this._sharedService.presentToast('Server error: ' + error);
    })
  }

  showRegister() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    this.submitAttempt = true;

    if (this.loginForm.valid) {
      let body = { mobile: this.loginForm.controls['mobile'].value, password: this.loginForm.controls['password'].value };

      let load = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'Loading Please Wait...',
        // dismissOnPageChange: true
      });
      load.present();

      this._apiService.callApi(AppSettings.loginApi, 'post', body).subscribe(data => {
        load.dismiss();

        if (data.success) {
          this._sharedService.setStorage('loggedIn', true);
          this._sharedService.setStorage('mobile', this.loginForm.controls['mobile'].value);
          this._sharedService.setStorage('name', data.data[0].name);
          this._sharedService.setStorage('role', data.data[0].role);
          this._sharedService.setStorage('domain_admin', data.data[0].domain_admin);

          this._sharedService.name = data.data[0].name;
          this._sharedService.mobile = this.loginForm.controls['mobile'].value;
          this._sharedService.role = data.data[0].role;
          this._sharedService.domain_admin = data.data[0].domain_admin;

          this.navCtrl.setRoot(IssuesTabsPage);
        } else {
          this.submitAttempt = false;
          this._sharedService.presentToast(data.error);
          this.loginForm.patchValue({
            mobile: '',
            password: ''
          })
        }
      }, error => {
        load.dismiss();
        this._sharedService.presentToast('Server error: ' + error);
      });
    }
  }

  showLogin() {
    this.forgotPassword = false;
    this.submitAttempt = false;
    this.loginForm.controls['password'].setValidators([Validators.required]);
    this.loginForm.controls['password'].updateValueAndValidity();
  }

  forgetPassword() {
    this.submitAttempt = true;
    this.forgotPassword = true;
    this.loginForm.controls['password'].clearValidators();
    this.loginForm.controls['password'].updateValueAndValidity();

    if (this.loginForm.valid) {
      let load = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'Loading Please Wait...',
      });
      load.present();

      this._apiService.callApi(AppSettings.forgetPasswordApi, 'post', { mobile: this.loginForm.controls['mobile'].value }).subscribe(data => {
        let message;
        if (data.success) {
          message = 'Your will receive your new password in a SMS shortly';
        } else {
          message = data.error;
        }

        load.dismiss();
        this._sharedService.presentToast(message);
        this.navCtrl.setRoot(WelcomePage);
        this.submitAttempt = false;
        this.forgotPassword = false;
      }, error => {
        load.dismiss();
        this._sharedService.presentToast('Server error: ' + error);
      });
    }
  }
}
