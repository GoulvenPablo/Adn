import { Component } from '@angular/core';
import { NavController ,PopoverController, AlertController, Platform , ModalController} from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import {NotificationsPage} from "../notifications/notifications";

import {SearchResultPage}from '../search-result/search-result';

import {MenuController } from 'ionic-angular';
import { AngularFireObject, AngularFireList } from 'angularfire2/database';


import { DatabaseProvider } from '../../providers/database/database';
import { ImagePicker } from '@ionic-native/image-picker';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 private _COLL 		: string 			= "Users";

 searchQuery: string = '';
 items: string[];
 searchvalue: string = '';





 private _DOC 		: string 			= "Xy76Re34SdFR1";



 private _CONTENT  	: any;



 public locations     : any;

    constructor(public navCtrl: NavController,
       public authData: AuthData,
        public popoverCtrl: PopoverController,
         public menuctrl: MenuController,
       private _DB: DatabaseProvider,
        private _ALERT  : AlertController,
      private modalCtrl: ModalController) {



          this.initializeItems();



  }

  initializeItems() {
    this.items = [
      'BTP',
      'R&D'
    ];
  }



  logOut() {
      this.authData.logoutUser().then(() => {
          this.navCtrl.setRoot(Login);
      });


  }

  presentNotifications(myEvent) {

    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }



   search(){

     console.log(this.searchvalue);
     let params = { searchvalue: this.searchvalue, isEdited: true }



     this.navCtrl.push(SearchResultPage,params)





   }

   tagStrVerify(str: string): boolean{
    return str !== 'ABC' && str.trim() !== '';
  }

  onChange(val: string){
    console.log(val)
    this.searchvalue = val
  }

  onFocus() {
    console.log('Focus')
  }

  onBlur() {
    console.log('Blur')
  }






}
