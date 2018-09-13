import { Component } from '@angular/core';
import { NavController ,PopoverController} from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import {NotificationsPage} from "../notifications/notifications";


import {MenuController } from 'ionic-angular';



import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /**
  * @name _COLL
  * @type {string}
  * @private
  * @description      Defines the name of the database collection
  */
 private _COLL 		: string 			= "Britain";




 /**
  * @name _DOC
  * @type {string}
  * @private
  * @description      Defines the initial document ID for the database collection
  */
 private _DOC 		: string 			= "Xy76Re34SdFR1";




 /**
  * @name _CONTENT
  * @type {any}
  * @private
  * @description      Used to store/provide the initial document data for the database collection
  */
 private _CONTENT  	: any;



 /**
  * @name locations
  * @type {any}
  * @public
  * @description      Property to store the returned documents from the database collection
  */
 public locations     : any;

    constructor(public navCtrl: NavController,
       public authData: AuthData,
        public popoverCtrl: PopoverController,
         public menuctrl: MenuController,
       private _DB: DatabaseProvider) {


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


}
