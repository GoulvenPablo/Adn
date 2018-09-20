import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StartPage } from '../pages/startpage/startpage';

import {IonTagsInputModule} from "ionic-tags-input";

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {NotificationsPage} from "../pages/notifications/notifications";

import {SearchResultPage}from '../pages/search-result/search-result';

import { ProjectsPage} from '../pages/projects/projects';
import { OffersPage } from '../pages/offers/offers';
import { ProfilePage } from '../pages/profile/profile';
import { ModalsPage} from '../pages/modals/modals';
import { Login } from '../pages/login/login';

import { Categories } from '../pages/categories/categories';

import {ResetPassword}from '../pages/reset-password/reset-password';
import {Signup} from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthData } from '../providers/auth-data';

import { AngularFirestoreModule } from 'angularfire2/firestore';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatabaseProvider } from '../providers/database/database';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ImagePicker } from '@ionic-native/image-picker';


import { Keyboard } from '@ionic-native/keyboard';

import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { ImageProvider } from '../providers/image/image';
import { PreloaderProvider } from '../providers/preloader/preloader';



import { IonicStorageModule } from '@ionic/storage';



var config = {
  backButtonText: '',
  backButtonIcon: 'md-arrow-back',
  pageTransition: 'ios',
  mode:'ios',
  menuType: 'overlay'
};



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
      TabsPage,
      Login,
      ResetPassword,
      Signup,
      NotificationsPage,

      ProfilePage,
      ModalsPage,
      SearchResultPage,
      OffersPage,
      ProjectsPage,
      StartPage,
      Categories

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,config),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule,
    AngularFireDatabaseModule,

    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    IonTagsInputModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
      TabsPage,
      Login,
      ResetPassword,
      Signup,
      NotificationsPage,

      ProfilePage,
      ModalsPage,
      SearchResultPage,
      OffersPage,
      ProjectsPage,
      StartPage,
      Categories
  ],
  providers: [

      AuthData,
    ImageProvider,
    PreloaderProvider,
    StatusBar,
    SplashScreen,
    DatabaseProvider,
    ImagePicker,
    Crop,
    Camera,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, ImageProvider, PreloaderProvider
  ]
})
export class AppModule {}
