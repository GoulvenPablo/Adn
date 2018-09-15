import { Component , ViewChild } from '@angular/core';
import { Platform , Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthData } from '../providers/auth-data';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import {ManageDocumentPage} from "../pages/manage-document/manage-document";
import { ProfilePage } from '../pages/profile/profile';

import firebase from 'firebase';


export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  appMenuItems: Array<MenuItem>;
  rootPage:any = TabsPage;

  constructor(platform: Platform,
     statusBar: StatusBar,
     splashScreen: SplashScreen ,
      public authData: AuthData) {

      // Initialize Firebase
      this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Profile', component: ProfilePage, icon: 'profile'},



    ];
      var config = {
      apiKey: "AIzaSyDqoQ1qZS-cbpj87kYbwQ57b5wjnG9e3U0",
      authDomain: "adna-f6f14.firebaseapp.com",
      databaseURL: "https://adna-f6f14.firebaseio.com",
      projectId: "adna-f6f14",
      storageBucket: "adna-f6f14.appspot.com",
      messagingSenderId: "523623921315"
      };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged((user) => {

          if (!user) {
              console.log("not login");
              this.rootPage = Login;



          } else {
              console.log("login");
              this.rootPage = HomePage;

            //  if (user.displayName == null){
            //    this.rootPage = ManageDocumentPage;
                user.providerData.forEach(function (profile) {
                  console.log("Sign-in provider: " + profile.providerId);
                  console.log("  Provider-specific UID: " + profile.uid);
                  console.log("  Name: " + profile.displayName);
                  console.log("  Email: " + profile.email);
                  console.log("  Photo URL: " + profile.photoURL);
                });

          //    }





              console.log(user)

          }

      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    console.log(page.component);
    console.log("ok")
  }

  logOut() {
      this.authData.logoutUser().then(() => {
          this.nav.setRoot(Login);
      });


  }
}
