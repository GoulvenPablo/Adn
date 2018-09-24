


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
        private jobsRender    : any;
        constructor(public navCtrl       : NavController,
                      private platform     : Platform,
                      private modalCtrl    : ModalController,
                      private _IMG         : ImageProvider,
                      private _LOADER      : PreloaderProvider,
                      public popoverCtrl: PopoverController,
                      private _DB          : DatabaseProvider) {
        }

        ionViewDidLoad() {
          console.log('ionViewDidLoad ProfilePage');
          this.loadAndParseProfiles()
        }

        loadAndParseProfiles()
         {
            this.jobsRender = this._DB.renderJobs();

         }


         editProfile(profile)
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
         goTo(page, profile){

           let params = { profile: profile, isEdited: true }
           this.navCtrl.push(page , params);



         }

         addRecord()
         {
            let params = { typepage: 'offers'}
            this.navCtrl.push(AddOfferPage, params)


         }



      }
