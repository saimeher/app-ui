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
  selector: 'caretaker-admin',
  templateUrl: 'caretaker-admin.html',
  styles: [`
        .invalid {
            border-top: 1px dotted #ea6153;
            border-right: 1px dotted #ea6153;
        }        
  `]
})
export class CaretakeradminPage {
    taskeditForm : FormGroup;
  lastImage: string = null;
  images: Array<any> = [];
  editImages: Array<any> = [];
  loading: Loading;
  newFileName: string;

  did: number;
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
id;


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


        this.taskeditForm = this.fb.group({
            priority: [''],
            status: [''],
            assigned_on:[''],
            onholdtext:[''],
            assignedtext:[''],
            cannottext:[''],
            repaired_on: [''],
            repaired_by: [],
            date_of_resolution: new FormControl(),
            notes: [],
            did: []
          })
  }
  domainSelected(domain) {
    let info = '';
    this._sharedService.presentToast(domain.info, 'bottom');
  }
  ionViewDidEnter() {
    this.initializeItems();
    this.domains = AppSettings.domains;
    this.status = AppSettings.status;
    const _dateToIso = new DateToIso();
    this.images = [];
    this.editImages = [];
    if (this.navParams.data > 0) {
      this.did = this.navParams.data;
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
            this.taskeditForm.patchValue({
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

            // this.tempPatch = {
            //   priority: temp.priority,
            //   raised_by: temp.raised_by,
            //   repaired_by: temp.repaired_by,
            //   repaired_on: temp.repaired_on != null ? _dateToIso.transform(temp.repaired_on, null) : '',
            //   date_of_resolution: temp.date_of_resolution,
            //   notes: temp.notes,
            //   status: temp.status
            // };
            // console.log(this.tempPatch);
            // console.log("temp domain", temp.domain, this.domain_admin, (this.domain_admin && this.domain_admin.indexOf(temp.domain + ',') != -1));
          } else {
            this._sharedService.presentToast('Error retrieving data to edit');
          }
        

        }, error => {
          load.dismiss();
          this._sharedService.presentToast('Server error: ' + error);
        });
      }
    }
  }

  insertData() {

    let load = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...',
    })

   
    console.log(this.did);
    
      console.log('hui');
      let edit={};
      edit['priority'] =  this.taskeditForm.value.priority;
      edit['status']= this.taskeditForm.value.status;
    //   edit['assigned_on']= this.assigned_on;
       edit['assigned_to']= this.id;
      // edit['assigned_to'] = this.name1;
      edit['assignedtext']= this.taskeditForm.value.assignedtext;
      edit['onholdtext']= this.taskeditForm.value.onholdtext;
    //   edit['date_of_resolution']= this.date_of_resolution;
      edit['notes'] = this.taskeditForm.value.notes;
      edit['cannottext'] = this.taskeditForm.value.cannottext;
      edit['did'] = this.did;
      console.log(edit);
      this._apiService.callApi(AppSettings.UPDATEISSUE, 'post',edit)
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
