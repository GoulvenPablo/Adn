import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class List {

  mainList: Array<any>;
  showSearch: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    this.mainList = [{img: 'assets/img/01.png'},{img: 'assets/img/02.png'},{img: 'assets/img/03.png'},{img: 'assets/img/01.png'},{img: 'assets/img/02.png'},{img: 'assets/img/03.png'}]
  }

// searchbar
  toggleSearch() {
    this.showSearch =!this.showSearch;
  }  

// like function
activeLike(item,$event){
  $event.stopPropagation();
  item.like = !item.like;
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
