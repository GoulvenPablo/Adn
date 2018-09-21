import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Categories } from './categories';
import { OffersPage } from '../offers/offers';

@NgModule({
  declarations: [
    Categories,
  ],
  imports: [
    IonicPageModule.forChild(Categories),
    OffersPage
  ],
  exports: [
    Categories
  ]
})
export class CategoriesPageModule {}
