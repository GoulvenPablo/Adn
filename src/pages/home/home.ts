import { Component } from '@angular/core';
import { NavController ,PopoverController, AlertController, Platform , ModalController} from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import {NotificationsPage} from "../notifications/notifications";
import { NavParams, Content, Slides} from 'ionic-angular';
import {SearchResultPage}from '../search-result/search-result';
import { ViewChild, ElementRef, Renderer, NgZone } from '@angular/core';
import {MenuController } from 'ionic-angular';
import { AngularFireObject, AngularFireList } from 'angularfire2/database';


import { DatabaseProvider } from '../../providers/database/database';
import { ImagePicker } from '@ionic-native/image-picker';

import { NativeStorage } from '@ionic-native/native-storage';

import * as firebase from 'firebase';

import 'rxjs/Rx';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  news: Array<any>;
  headerbg: any;
  darkHeader: any;
  slider: any;
  currentSliderIndex= 0;
  private jobsRender: any;


 searchQuery: string = '';
 items: string[];
 searchvalue: string = '';
 @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;



 public locations     : any;

    constructor(public navCtrl: NavController,
       public authData: AuthData,
        public navParams: NavParams,
         public myElement: ElementRef,
         public renderer: Renderer,
         public zone :NgZone,
        public popoverCtrl: PopoverController,
         public menuctrl: MenuController,
       private _DB: DatabaseProvider,
        private _ALERT  : AlertController,
      private modalCtrl: ModalController,
    private nativeStorage: NativeStorage) {

        this.news = [{category:'Today News',img: 'assets/img/slide1.png', title: 'The standard Lorem Ipsum passage, used since the 1500s', name: 'Edward bush', time: '5 Mins ago'},
         {category:'Political',img: 'assets/img/slide2.png', title: 'Donald TrumpThe standard Lorem Ipsum passage.', name: 'Jossef Josh', time: '15 Mins ago'},
          {category:'Economist',img: 'assets/img/slide3.png', title: 'The standard Lorem Ipsum passage, used since the 1500s', name: 'Lela Edward', time: '10 Mins ago'},
           {category:'Sports',img: 'assets/img/slide4.png', title: 'The standard Lorem Ipsum passage, used since the 1500s', name: 'Lela Edward', time: '10 Mins ago'}]

          this.initializeItems();
          this.jobsRender = this._DB.renderJobs();

          this.nativeStorage.getItem('preference')
          .then(
            data => {console.log(data)
              console.log("storedItem")
            for (let entry of data) {
                console.log(entry);

                this.nativeStorage.setItem('preference', this.jobsRender)
              .then(
                () => console.log('Stored prefernces!'),
                error => console.error('Error storing item', error)
              );

              }},
            error => console.error(error)
          );



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

  goToBottom(){
    this.content.scrollTo(0,window.innerHeight-55,1000);
  }

//currentSliderIndex function
  slideChanged() {
    this.currentSliderIndex = this.slides.getActiveIndex();
    if(this.currentSliderIndex==this.news.length) this.currentSliderIndex=this.news.length-1;
  }

  //scroll header function
  ngAfterViewInit() {
    var lengthHeader=document.getElementsByClassName("my-header").length -1;
    var lengthSlider=document.getElementsByClassName("app-slider").length -1;
    this.headerbg = document.getElementsByClassName("my-header")[lengthHeader];
    this.slider = document.getElementsByClassName("app-slider")[lengthSlider];
  }

  scrollingFun(ev){
    ev.domWrite(() => {
        this.updateHeader(ev);
      //
    });
  }
  updateHeader(ev) {
  if (ev.scrollTop > 0) {
    this.darkHeader = ev.scrollTop / 400;
    this.renderer.setElementClass(this.slider, 'pager', true);
  }else  this.renderer.setElementClass(this.slider, 'pager', false);

  this.renderer.setElementStyle(this.headerbg, 'background', 'rgba(0,179,138,' + this.darkHeader +')');
}

// comment modal
  commentModal() {
    let pageModal = this.modalCtrl.create('CommentmodalPage');
    pageModal.present();
  }

  goTo(page){
    this.navCtrl.push(page);
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
