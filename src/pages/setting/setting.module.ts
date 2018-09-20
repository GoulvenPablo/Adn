import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Setting } from './setting';
import {IonTagsInputModule} from "ionic-tags-input";
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';

@NgModule({
  declarations: [
    Setting,
  ],
  imports: [
    IonicPageModule.forChild(Setting),
    IonTagsInputModule,
    SQLite,
    SQLitePorter
  ],
  exports: [
    Setting
  ]
})
export class SettingPageModule {}
