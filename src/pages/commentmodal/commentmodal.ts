import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ViewController  } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'commentmodal.html'
})
export class CommentmodalPage {

  comments:Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {
    this.comments = [
    {id:"1",name:"John arti",comment:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur" },
    {id:"2",name:"michael kors",comment:"It has roots."}, 
    {id:"3",name:"John smith",comment:"It has roots in a piece of classical Latin literature.",reply:true},
    {id:"4",name:"James kors",comment:"Lorem Ipsum is not simply"}];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
