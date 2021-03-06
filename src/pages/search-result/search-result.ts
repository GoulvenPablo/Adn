import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { ModalsPage } from '../modals/modals';
import {  Platform, ModalController } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx';
/**
 * Generated class for the SearchResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {



  public profiles    : any;
  public tags :  any     = [];

  constructor(public navCtrl: NavController,
     public params: NavParams,

                   private platform     : Platform,
                   private modalCtrl    : ModalController,
                   private _IMG         : ImageProvider,
                   private _LOADER      : PreloaderProvider,
                   private _DB          : DatabaseProvider
  ) {
    this.loadAndParseProfiles();


    if(params.get('isEdited'))
    {
        console.log("parameter passed")
        let searchresult = params.get('searchvalue')
        this.tags = searchresult;
        console.log(searchresult);

    }

  }



  loadAndParseProfiles()
   {
      this.profiles = this._DB.searchProfiles(this.tags);

   }



}
