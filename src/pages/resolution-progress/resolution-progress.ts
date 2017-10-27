import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import { AppSettings } from '../app.settings';
import { ApiService, Issue, DeviceService, SharedService, DateToIso } from '../../common/common';
import { IssuesListPage } from '../pages';

declare var cordova: any;

@Component({
  selector: 'resolution-progress',
  templateUrl: 'resolution-progress.html',
  styles: [`
        .invalid {
            border-top: 1px dotted #ea6153;
            border-right: 1px dotted #ea6153;
        }        
  `]
})
export class ResolutionProgressPage {
  resolutioninform : FormGroup;
  lastImage: string = null;
  images: Array<any> = [];
  editImages: Array<any> = [];
  loading: Loading;
  newFileName: string;
  today = new Date();
  did: number;
  type : string;
  domains: Array<{ title: string, value: string }>;
  domain;
  status;
  reset;
  name;
  role;
  role1;
  domain_admin;
  showdays = '';
  searchQuery: string = '';
  items = [];
  expected_resolution_date;
  id;
  priority;
  disableSince;

  submitAttempt: boolean = false;
  tempPatch;      // if user is not admin, but tries to update status in another category (fixx)
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController, public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private _apiService: ApiService,
    private _deviceService: DeviceService,
    private _sharedService: SharedService,
    public fb: FormBuilder,) {


      this.resolutioninform = this.fb.group({
        // expected_resolution_date: {
        //   date: {
        //     year: date.getFullYear(),
        //     month: date.getMonth() + 1,
        //     day: date.getDate()
        //   }
        // },
        resolutiontext: [''],
        expected_resolution_date: [''],
        status: [''],
        cannottext: [''],
        onholdtext: [''],
        repairedtext:[''],
      });
  }

  domainSelected(domain) {
    let info = '';
    this._sharedService.presentToast(domain.info, 'bottom');
  }
  curdate='';
  ionViewDidEnter() {

    console.log('fgvsjhghfgsdhfsgdhfgsdhfgsdhfgsdhfg',this.today);
    console.log(this.today.toISOString().toString().substr(0,10));
    this.curdate=this.today.toISOString().toString().substr(0,10);


    // this.type = this.navParams.get('type');
  //  this.disableSince: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1 }
    this.initializeItems();
    this.domains = AppSettings.domains;
    this.status = AppSettings.status;
    const _dateToIso = new DateToIso();
    this.images = [];
    this.editImages = [];
    console.log(this.navParams.data);
     this.did = this.navParams.data.did;
    this.type = this.navParams.data.type;
      if (this.did) {
        let load = this.loadingCtrl.create({
          spinner: 'circles',
          content: 'Loading Please Wait...',
          // dismissOnPageChange: true
        });
        load.present();
        this._apiService.callApi(AppSettings.getIssueApi, "post", { did: this.did }).subscribe(data => {
          load.dismiss();
          if (data.success) {
            let temp = data.data[0];
            this.resolutioninform.patchValue({
              did: this.did,
              domain: temp.domain,
              issue_desc: temp.issue_desc,
              location: temp.location,
              problem: temp.problem,
              raised_by: temp.raised_by,
              mobile: temp.mobile,
              reg_no: temp.reg_no,
              role: this._sharedService.role,
              image: temp.image,
              deletedImages: '',
              priority: temp.priority,
              repaired_by: temp.repaired_by,
              repaired_on: temp.repaired_on != null ? _dateToIso.transform(temp.repaired_on, null) : '',
              date_of_resolution: temp.date_of_resolution,
              notes: temp.notes,
              status: temp.status

            });
            console.log(temp, 'test');
          } else {
            this._sharedService.presentToast('Error retrieving data to edit');
          }
        

        }, error => {
          load.dismiss();
          this._sharedService.presentToast('Server error: ' + error);
        });
      }
    console.log(this.did,this.type);
  }

  insertData() {

    let load = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...',
    })

   
    console.log(this.did);
    
      console.log('hui');
      console.log('date is', this.expected_resolution_date);
      console.log(this.resolutioninform.value);
      let value = {};
      value['expected_resolution_date'] = this.resolutioninform.value.expected_resolution_date;
      value['resolutiontext'] = this.resolutioninform.value.resolutiontext;
      value['onholdtext'] = this.resolutioninform.value.onholdtext;
      value['cannottext'] = this.resolutioninform.value.cannottext;
      value['did'] = this.did;
      value['status'] = this.resolutioninform.value.status;
      value['repairedtext'] = this.resolutioninform.value.repairedtext;
      console.log(value);
      this._apiService.callApi(AppSettings.resolutioninprogress, 'post',value)
        .subscribe(data => {
          if (data) {
            this._sharedService.presentToast('Issue updated successfully');
          }
          
          this.navCtrl.setRoot(IssuesListPage);
        },
        error => {
          load.dismiss();
          this._sharedService.presentToast('Server error: ' + error);
        });
    }
    selStataus(event) {
      console.log(event);
      this.showdays = event;
      console.log(this.showdays);
    }
    initializeItems() {
      const vals = {
        utype: 'adm',
  
      }
      this._apiService.callApi(AppSettings.getStaffData, 'post', vals).subscribe(dataa => {
        // console.log(dataa);
        for (var i = 0; i < dataa.data.data.length; i++) {
          this.items[i] = {};
  
          this.items[i]["id"] = dataa.data.data[i].reg_no;
          this.items[i]["itemName"] = dataa.data.data[i].reg_no + ' - ' + dataa.data.data[i].name;
          //  console.log( this.items);
        }
      });
    }
    selectItems(event) {
      console.log(event);
      this.id = event;
      console.log(this.id);
    }
}
