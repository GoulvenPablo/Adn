import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { ModalsPage } from '../modals/modals';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  public profiles    : any;
  constructor(public navCtrl       : NavController,
                private platform     : Platform,
                private modalCtrl    : ModalController,
                private _IMG         : ImageProvider,
                private _LOADER      : PreloaderProvider,
                private _DB          : DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.loadAndParseProfiles()
  }

  loadAndParseProfiles()
   {
      this.profiles = this._DB.renderProfiles();

   }


   addRecord()
   {
      let modal = this.navCtrl.push(ModalsPage)


   }

   editMovie(profile)
   {
      let params = { profile: profile, isEdited: true },
          modal  = this.modalCtrl.create(ModalsPage, params);

      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this.loadAndParseProfiles();
         }
      });
      modal.present();
   }



   deleteProfile(profile)
   {
      this._DB.deleteProfile(profile.id)
      .then((data) =>
      {
         this.loadAndParseProfiles();
      });
   }



}
