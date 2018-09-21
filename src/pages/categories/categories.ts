import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OffersPage } from '../offers/offers';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class Categories {

  category: Array<any>;
  showSearch: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.category = [{img: 'assets/img/11.png', title: 'Associations', page: 'Associations'},
     {img: 'assets/img/22.png', title: 'Stage', page: 'Internship'},
     {img: 'assets/img/33.png', title: 'Nouveauté', page: 'Nouveaute'},
      {img: 'assets/img/44.png', title: 'Recherche', page: 'Recherche'},
      {img: 'assets/img/55.png', title: 'Emploi', page: OffersPage}]
  }

// searchbar
  toggleSearch() {
    this.showSearch =!this.showSearch;
  }

//goTo function
  goTo(page){
    this.navCtrl.push(page);
    console.log(page)
  }



}
