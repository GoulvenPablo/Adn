import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class Favorite {

  mainList: Array<any>;
  showSearch: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    this.mainList = [{img: 'assets/img/01.png'},{img: 'assets/img/02.png'},{img: 'assets/img/03.png'},{img: 'assets/img/01.png'},{img: 'assets/img/02.png'},{img: 'assets/img/03.png'}]
  }

// searchbar
  toggleSearch() {
    this.showSearch =!this.showSearch;
  }  

// remove item of list
  removeItem(item){
    for(var i = 0; i < this.mainList.length; i++) {
      if(this.mainList[i] == item){
        this.mainList.splice(i, 1);
      }
 
    }
  }  

//Filter popover function
  presentFilterPopover(myEvent) {
    let popover = this.popoverCtrl.create('Filter');
    popover.present({
      ev: myEvent
    });
  }

//goTo function
  goTo(page){
    this.navCtrl.push(page);
  }  

}