import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {NotificationsPage} from "../pages/notifications/notifications";
import {ManageDocumentPage} from "../pages/manage-document/manage-document";

import { ProfilePage } from '../pages/profile/profile';
import { Login } from '../pages/login/login';

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

import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { ImageProvider } from '../providers/image/image';
import { PreloaderProvider } from '../providers/preloader/preloader';



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
      ManageDocumentPage,
      ProfilePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    AngularFireDatabaseModule,

    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
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
      ManageDocumentPage,
      ProfilePage
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}, ImageProvider, PreloaderProvider
  ]
})
export class AppModule {}
