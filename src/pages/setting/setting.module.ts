import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Setting } from './setting';
import {IonTagsInputModule} from "ionic-tags-input";

@NgModule({
  declarations: [
    Setting,
  ],
  imports: [
    IonicPageModule.forChild(Setting),
    IonTagsInputModule
  ],
  exports: [
    Setting
  ]
})
export class SettingPageModule {}
