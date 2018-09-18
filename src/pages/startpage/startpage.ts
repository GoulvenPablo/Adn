import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-startpage',
  templateUrl: 'startpage.html'
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

//goTo function
  goTo(page){
    this.navCtrl.push(page);
  }

}
