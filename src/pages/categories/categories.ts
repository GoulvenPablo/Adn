import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class Categories {

  category: Array<any>;
  showSearch: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.category = [{img: 'assets/img/11.png', title: 'associations'}, {img: 'assets/img/22.png', title: 'economist'}, {img: 'assets/img/33.png', title: 'sports'}, {img: 'assets/img/44.png', title: 'weather'}, {img: 'assets/img/55.png', title: 'financial'}]
  }

// searchbar
  toggleSearch() {
    this.showSearch =!this.showSearch;
  }

//goTo function
  goTo(page){
    this.navCtrl.push(page);
  }

}
