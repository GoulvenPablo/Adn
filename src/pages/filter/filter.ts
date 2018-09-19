import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-filter',
  template: `
    <ion-list class="setting-content">

      <ion-list-header no-lines>Date of news</ion-list-header>
      <ion-item-group>
        <ion-item color="lighten" mode="md" no-lines>
          <ion-label>All</ion-label>
          <ion-checkbox mode="md" color="secondary" item-right></ion-checkbox>
        </ion-item>
        <ion-item color="lighten" mode="md" no-lines>
          <ion-label>Today</ion-label>
          <ion-checkbox mode="md" color="secondary" item-right></ion-checkbox>
        </ion-item>
        <ion-item color="lighten" mode="md" no-lines>
          <ion-label>Last week</ion-label>
          <ion-checkbox mode="md" color="secondary" item-right></ion-checkbox>
        </ion-item>
        <ion-item color="lighten" mode="md" no-lines>
          <ion-label>Last month</ion-label>
          <ion-checkbox mode="md" color="secondary" item-right></ion-checkbox>
        </ion-item>
      </ion-item-group>

      <ion-list-header no-lines>Choose your area</ion-list-header>

      <ion-item-group>
        <ion-item color="lighten" mode="md" no-lines>
          <ion-label>All area</ion-label>
          <ion-checkbox mode="md" color="secondary" item-right></ion-checkbox>
        </ion-item>
        <ion-item color="lighten" mode="md" no-lines>
          <ion-label>Middle east</ion-label>
          <ion-checkbox mode="md" color="secondary" item-right></ion-checkbox>
        </ion-item>
        <ion-item color="lighten" mode="md" no-lines>
          <ion-label>united states</ion-label>
          <ion-checkbox mode="md" color="secondary" item-right></ion-checkbox>
        </ion-item>
        <ion-item color="lighten" mode="md" no-lines>
          <ion-label>The arabian</ion-label>
          <ion-checkbox mode="md" color="secondary" item-right></ion-checkbox>
        </ion-item>
      </ion-item-group>

    </ion-list>
  `
})
export class Filter {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }

}