import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OffersPage } from '../offers/offers';
import { AssociationsPage } from '../associations/associations';
import { SearchPage } from '../search/search';
import { InternshipPage } from '../internship/internship';
import { NewsPage } from '../news/news';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class Categories {

  category: Array<any>;
  showSearch: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.category = [{img: 'assets/img/11.png', title: 'Associations', page: AssociationsPage},
     {img: 'assets/img/22.png', title: 'Stage', page: InternshipPage},
     {img: 'assets/img/33.png', title: 'Nouveauté', page: NewsPage},
      {img: 'assets/img/44.png', title: 'Recherche', page: SearchPage},
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
