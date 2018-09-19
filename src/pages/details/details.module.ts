import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Details } from './details';
import { Ionic2RatingModule } from 'ionic2-rating';


@NgModule({
  declarations: [
    Details,
  ],
  imports: [
    IonicPageModule.forChild(Details),
    Ionic2RatingModule
  ],
  exports: [
    Details
  ]
})
export class DetailsPageModule {}
