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


  public movies    : any;
  constructor(public navCtrl       : NavController,
                private platform     : Platform,
                private modalCtrl    : ModalController,
                private _IMG         : ImageProvider,
                private _LOADER      : PreloaderProvider,
                private _DB          : DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  loadAndParseMovies()
   {
      this.movies = this._DB.renderMovies();
      this._LOADER.hidePreloader();
   }


   addRecord()
   {
      let modal = this.navCtrl.push(ModalsPage)

   }

   editMovie(movie)
   {
      let params = { movie: movie, isEdited: true },
          modal  = this.modalCtrl.create('Modals', params);

      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this.loadAndParseMovies();
         }
      });
      modal.present();
   }



   deleteMovie(movie)
   {
      this._DB.deleteMovie(movie.id)
      .then((data) =>
      {
         this.loadAndParseMovies();
      });
   }



}
