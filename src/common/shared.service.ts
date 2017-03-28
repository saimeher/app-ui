import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@Injectable()
export class SharedService {
    public mobile: string;
    public name: string;
    public role: string;

    constructor(private toastCtrl: ToastController, private storage: Storage) {


    }

    presentToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            position: 'top',
            duration: 3000
        });
        toast.present();
    }

    setStorage(key, value) {
        this.storage.ready().then(() => {
            this.storage.set(key, value);
        });
    }

    getStorage(key) {
        this.storage.ready().then(() => {
            console.log(this.storage);

            this.storage.get(key).then((val) => {
                return val;
            })
        });
    }
}