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

    this._sharedService.getStorage('loggedIn').subscribe(data => {
      if (data == true) {
        Observable.forkJoin([
          this._sharedService.getStorage('username'),
          this._sharedService.getStorage('reg_no'),
          this._sharedService.getStorage('role'),
        //  this._sharedService.getStorage('domain_admin'),
          this._sharedService.getStorage('currentUser'),
          this._sharedService.getStorage('mobile'),
          
        ]
        ).subscribe(dataArray => {
          if (dataArray[0]) this._sharedService.username = dataArray[0].toString();
          if (dataArray[1]) this._sharedService.reg_no = dataArray[1].toString();
          if (dataArray[2]) this._sharedService.role = dataArray[2].toString();
          if (dataArray[3]) this._sharedService.mobile = dataArray[3].toString();
          if (dataArray[3]) this._sharedService.token = dataArray[3].toString();
          this.navCtrl.setRoot(IssuesTabsPage);
        })
      }
    }, error => {
      this._sharedService.presentToast('Server error: ' + error);
    })
  }
  showRegister() {
    this.navCtrl.push(RegisterPage);
  }
  login() {
    this.submitAttempt = true;
    if (this.loginForm.valid) {
      let body = { username: this.loginForm.controls['mobile'].value, password: this.loginForm.controls['password'].value };
      let load = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'Loading Please Wait...',
        // dismissOnPageChange: true
      });
      load.present();
      this._apiService.callApi(AppSettings.loginApi, 'post', body).subscribe(data => {
        load.dismiss();
        if (data.success) {
          console.log(data, 'test1');
          this._sharedService.setStorage('loggedIn', true);
          this._sharedService.setStorage('username', data.name);
          this._sharedService.setStorage('reg_no', data.reg_no);
          this._sharedService.setStorage('role', data.utype);
          this._sharedService.setStorage('mobile', data.mobile);
          this._sharedService.setStorage('token', data.token);
         
         
          this._sharedService.username = data.name;
          this._sharedService.reg_no  = data.reg_no;
          this._sharedService.token = data.token;
          this._sharedService.mobile = data.mobile;
          this._sharedService.role = data.utype;
          this._sharedService.mobile = data.mobile;
          console.log( this._sharedService.mobile);
          sessionStorage.setItem('token',this._sharedService.token);
          sessionStorage.setItem('reg_no',this._sharedService.reg_no);
          sessionStorage.setItem('mobile',this._sharedService.mobile);
          sessionStorage.setItem('role', this._sharedService.role);
          sessionStorage.setItem('username',this._sharedService.username);
          console.log( this._sharedService.username);
          // sessionStorage.setItem('domain_admin',this._sharedService.domain_admin);


          this._apiService.callApi(AppSettings.GETROLE_API, 'post',{reg_no: this._sharedService.reg_no}).subscribe(data => {
            console.log(data);
            console.log('role ',data.data.role);
            
            // this._sharedService.setStorage('roleadmin', data.data.role);
            // sessionStorage.setItem('roleadmin',this._sharedService.roleadmin)
            // this._sharedService.setStorage('domain_admin',data.data.domain_admin);
            // sessionStorage.setItem('domain_admin',this._sharedService.domain_admin);
            sessionStorage.setItem('domain_admin',data.data.domain_admin);
             sessionStorage.setItem('roleadmin',data.data.role);
             sessionStorage.setItem('domain_admin',data.data.domain_admin);
          })
          console.log('roleadmin',sessionStorage.getItem('roleadmin'));
          console.log('domain_admin',sessionStorage.getItem('domain_admin'));
          console.log( this._sharedService.roleadmin);
          
          // this.getRole();
          
          this.navCtrl.setRoot(IssuesTabsPage);
        }
        else {
          this.submitAttempt = false;
          this._sharedService.presentToast(data.error);
          this.loginForm.patchValue({
            mobile: '',
            password: ''
          })
        }
      },
        error => {
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
        }
        else {
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