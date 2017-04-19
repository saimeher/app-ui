import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SharedService {
    public mobile: string;
    public name: string;
    public role: string;
    public domain_admin: string;

    constructor(private toastCtrl: ToastController, private storage: Storage) {


    }

    presentToast(message, position='top', duration=3000) {
        let toast = this.toastCtrl.create({
            message: message,
            position: position,
            duration: duration
        });
        toast.present();
    }

    setStorage(key, value) {
        this.storage.ready().then(() => {
            this.storage.set(key, value);
        });
    }

    getStorage(key) {
        return Observable.create(observer => {
            this.storage.ready().then(() => {
                this.storage.get(key).then((val) => {
                    observer.next(val);
                    observer.complete();
                })
            });
        });

        // return new Promise(resolve => {
        //     this.storage.ready().then(() => {
        //         console.log(this.storage);

        //         this.storage.get(key).then((val) => {
        //             resolve(val);
        //         })
        //     });
        // });
    }

    clearStorage() {
        this.storage.clear();
    }

    // helper functions
    categorySearch(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].value === nameKey) {
                return myArray[i];
            }
        }
    }
}