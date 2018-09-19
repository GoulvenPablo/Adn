import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentmodalPage } from './commentmodal';

@NgModule({
  declarations: [
    CommentmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentmodalPage),
  ],
  exports: [
    CommentmodalPage
  ]
})
export class CommentmodalPageModule {}
