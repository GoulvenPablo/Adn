import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { ImageProvider } from '../../providers/image/image';

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


    mainList: Array<any>;
    showSearch: any;
    public profiles: any;

    constructor(public navCtrl: NavController,
       public navParams: NavParams,
       public popoverCtrl: PopoverController,
       private _IMG         : ImageProvider,

       private _DB          : DatabaseProvider) {
      this.mainList = [{img: 'assets/img/01.png'},
      {img: 'assets/img/02.png'},
      {img: 'assets/img/03.png'},
      {img: 'assets/img/01.png'},
      {img: 'assets/img/02.png'},
      {img: 'assets/img/03.png'}]

      this.loadAndParseProfiles();
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
        this.profiles = this._DB.renderProfiles();

     }

}
