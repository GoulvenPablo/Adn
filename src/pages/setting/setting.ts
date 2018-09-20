import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Keyboard } from '@ionic-native/keyboard';
import { NativeStorage } from '@ionic-native/native-storage';







@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class Setting {

  public action = false;
  isvalid: boolean;
  public todo = {};
  tags = ['Ionic', 'Angular', 'TypeScript'];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
     public popoverCtrl: PopoverController,
     public _myApp:MyApp,
     private keyboard: Keyboard,
   private nativeStorage: NativeStorage) {
    this.action = this._myApp.animateVarible;

    this.nativeStorage.getItem('preference')
    .then(
      data => console.log(data),
      error => console.error(error)
    );

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

  setPreferencies(){

    console.log("ok")
    console.log(this.isvalid)

  }


  tagStrVerify(str: string): boolean{
   return str !== 'ABC' && str.trim() !== '';
  }

  onChange(val: string){
    console.log(val)
    this.nativeStorage.setItem('preference', {property: val})
  .then(
    () => console.log('Stored prefernces!'),
    error => console.error('Error storing item', error)
  );

  }

}
