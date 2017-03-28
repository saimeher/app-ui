import { Injectable } from '@angular/core';
import { Sim } from 'ionic-native';

declare var cordova: any;

@Injectable()
export class DeviceService {
    // public phoneNumber: string;
    // public subscriberId: string;

    constructor() {

    }

    // checkPermissions() {
    //     Sim.hasReadPermission().then(
    //         (info) => {
    //             console.log('in sim hasreadpermission. info is', info);

    //             if (!info) {
    //                 Sim.requestReadPermission().then(
    //                     () => {
    //                         console.log('in sim requestReadPermission. permission granted');
    //                         console.log('Permission granted');
    //                         return true;
    //                     },
    //                     () => {
    //                         console.log('in sim requestReadPermission. permission denied');
    //                         console.log('Permission denied');
    //                         return false;
    //                     }
    //                 );
    //             } else {
    //                 return true;
    //             }
    //         }
    //     );
    // }

    // getPhoneData() {
    //     var deviceInfo = cordova.require("cordova/plugin/DeviceInformation");
    //     deviceInfo.get(function (result) {
    //         console.log("result = " + result);
    //     }, function () {
    //         console.log("error");
    //     });

    // }

    getSimData() {
        Sim.getSimInfo().then(
            (info) => {
                console.log(JSON.stringify(info));

            },
            // (info) => console.log('Sim info: ', info),
            (err) => console.log('Unable to get sim info: ', err)
        );

        // return {phoneNumber: '', subscriberId: ''};

        // Sim.hasReadPermission().then(
        //     (info) => console.log('Has permission:', info)
        // );

        // Sim.requestReadPermission().then(
        //     () => console.log('Permission granted'),
        //     () => console.log('Permission denied')
        // );
    }

}