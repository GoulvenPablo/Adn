import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {

  constructor(public navCtrl: NavController, public params: NavParams
  ) {


    if(params.get('isEdited'))
    {
        console.log("parameter passed")
        let searchresult = params.get('searchvalue')
        console.log(searchresult);
    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultPage');
  }



}
