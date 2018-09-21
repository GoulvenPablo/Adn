import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Categories } from './categories';
import { OffersPage } from '../offers/offers';
import { SearchPage } from '../search/search';
import { AssociationsPage } from '../associations/associations';
import { InternshipPage } from '../internship/internship';
import { NewsPage } from '../news/news';

@NgModule({
  declarations: [
    Categories,
  ],
  imports: [
    IonicPageModule.forChild(Categories),
    OffersPage,
    SearchPage,
    AssociationsPage,
    InternshipPage,
    NewsPage
  ],
  exports: [
    Categories
  ]
})
export class CategoriesPageModule {}
