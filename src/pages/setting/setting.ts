import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Keyboard } from '@ionic-native/keyboard';


@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class Setting {

  public action = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public _myApp:MyApp, private keyboard: Keyboard) {
    this.action = this._myApp.animateVarible;
  }

  // animate Function
  public checkbox;
  animateApp(e:any){ 
    this._myApp.animateVarible = e.checked;
    this.action = this._myApp.animateVarible;
  }

  // FocusInput Function
  focusInput(input){
   input.disabled=!input.disabled;
    if(!input.disabled){
      input.setFocus();
      this.keyboard.show();
    }
  }

}