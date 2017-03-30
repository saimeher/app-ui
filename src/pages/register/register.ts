import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppSettings } from '../app.settings';
import { ApiService, SharedService } from '../../common/common';

@Component({
    templateUrl: 'register.html'
})
export class RegisterPage {
    mobile: string = '9885721144';
    password: string = '1234';
    name: string = 'Vijay';

    constructor(private navCtrl: NavController, private _apiService: ApiService, private _sharedService: SharedService) {

    }

    register() {
        let body = {
            mobile: this.mobile,
            password: this.password,
            name: this.name
        };

        this._apiService.callApi(AppSettings.registerApi, 'post', body).subscribe(data => {
            if (data.success) {
                this._sharedService.presentToast('User registered successfully');
                this._sharedService.setStorage('mobile', this.mobile);
                this._sharedService.setStorage('loggedIn', true);
                this._sharedService.setStorage('name', this.name);
                this._sharedService.setStorage('role', 'user');
                this._sharedService.mobile = this.mobile;
                this.navCtrl.popToRoot();
            } else {
                this._sharedService.presentToast('Error: ' + data.error);
            }
        });
    }
}
