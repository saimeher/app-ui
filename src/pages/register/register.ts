import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, LoadingController } from 'ionic-angular';

import { AppSettings } from '../app.settings';
import { ApiService, SharedService } from '../../common/common';

@Component({
    templateUrl: 'register.html',
    styles: [`

        .invalid {
            border-top: 1px dotted #ea6153;
            border-right: 1px dotted #ea6153;
        }
  `]
})
export class RegisterPage {
    registerForm: FormGroup;
    submitAttempt = false;

    constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private _apiService: ApiService, private _sharedService: SharedService, private formBuilder: FormBuilder) {
        this.registerForm = this.formBuilder.group({
            mobile: ['', Validators.required],
            password: ['', Validators.required],
            name: ['', Validators.required]
        })

    }

    register() {
        this.submitAttempt = true;
        if (this.registerForm.valid) {
            let body = Object.assign({}, this.registerForm.value);

                  let load = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'Loading Please Wait...',
        dismissOnPageChange: true
      });
      load.present();

            this._apiService.callApi(AppSettings.registerApi, 'post', body).subscribe(data => {
                load.dismiss();
                if (data.success) {
                    this._sharedService.presentToast('User registered successfully');
                    this._sharedService.setStorage('mobile', this.registerForm.controls['mobile'].value);
                    this._sharedService.setStorage('loggedIn', true);
                    this._sharedService.setStorage('name', this.registerForm.controls['name'].value);
                    this._sharedService.setStorage('role', 'user');
                    this._sharedService.mobile = this.registerForm.controls['mobile'].value;
                    this.navCtrl.popToRoot();
                } else {
                    this._sharedService.presentToast('Error: ' + data.error);
                }
            }, error => {
        load.dismiss();
        this._sharedService.presentToast('Server error: ' + error);
      });
        }
    }
}
