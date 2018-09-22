import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { ImageProvider } from '../../providers/image/image';
import {Platform, ModalController } from 'ionic-angular';
import { PreloaderProvider } from '../../providers/preloader/preloader';

import { ModalsPage } from '../modals/modals';
import { AddOfferPage } from '../add-offer/add-offer';
/**
 * Generated class for the OffersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {



    showSearch: any;
    public jobs: any;

    constructor(public navCtrl: NavController,
       public navParams: NavParams,
       private modalCtrl    : ModalController,
       public popoverCtrl: PopoverController,
       private _IMG         : ImageProvider,
       private _LOADER      : PreloaderProvider,
       private _DB          : DatabaseProvider) {



    }
    ionViewDidLoad() {
      console.log('ionViewDidLoad ProfilePage');
      this.loadAndParseProfiles()
    }

  // searchbar
    toggleSearch() {
      this.showSearch =!this.showSearch;
    }


  // like function
  activeLike(item,$event){
    $event.stopPropagation();
    item.like = !item.like;
  }

  //Filter popover function
    presentFilterPopover(myEvent) {
      let popover = this.popoverCtrl.create('Filter');
      popover.present({
        ev: myEvent
      });
    }

  //goTo function
    goTo(page){
      this.navCtrl.push(page);
    }

    loadAndParseProfiles()
     {
        this.jobs = this._DB.renderJobs();
        console.log("hello")

     }


     addRecord()
     {
        let params = { typepage: 'offers', isEdited: true }
        this.navCtrl.push(AddOfferPage, params)


     }

}
