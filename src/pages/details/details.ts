import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class Details {

  rate: any;
  like: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.rate=2;
  }

// share modal function
  presentshareModal() {
   let shareModal = this.modalCtrl.create('ShareModal', { userId: 8675309 });
   shareModal.present();
 }

//activeLike function  
  activeLike(){
    this.like = !this.like;
  }

// comment modal
  commentModal() {
    let pageModal = this.modalCtrl.create('CommentmodalPage');
    pageModal.present();
  }  

}