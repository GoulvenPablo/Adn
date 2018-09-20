import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';


// We MUST import both the firebase AND firestore modules like so
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class DatabaseProvider {


   private _DB : any;

   private _LocalDB : SQLiteObject;
   private _LocalDB_NAME : string 		= "ionic.db";



   constructor(public http: Http,
  
            private _PLAT       : Platform,
     			   private _SQL        : SQLite,
     			   private _PORTER     : SQLitePorter)
   {
      // Initialise access to the firestore service
      this._DB = firebase.firestore();
   }



   /**
    * Create the database collection and defines an initial document
    * Note the use of merge : true flag within the returned promise  - this
    * is needed to ensure that the collection is not repeatedly recreated should
    * this method be called again (we DON'T want to overwrite our documents!)
    */





   renderProfiles() : Observable<any>
   {

      return new Observable(observer =>
      {

         let profiles : any = [];
         firebase.database().ref('profile').orderByKey().once('value', (items : any) =>
         {
            items.forEach((item) =>
            {
              console.log(item.val().description);
              console.log(item.key);
              console.log(item.val().jobtype)
               profiles.push({
                 id        : item.key,
                 jobtype : item.val().jobtype,
                 birthdate : item.val().birthdate,
                 phonenumber : item.val().phonenumber,
                 familyname : item.val().familyname,
                 association : item.val().association,
                 name : item.val().name,




                 image     : item.val().image,

                 description   : item.val().description,

	           });
            });

            observer.next(profiles);
            observer.complete();
         },
         (error) =>
         {
            console.log("Observer error: ", error);
            console.dir(error);
            observer.error(error)
         });

      });
   }

   searchProfiles(input) : Observable<any>
   {

      return new Observable(observer =>
      {
        let profiles : any = [];
        for (let i of input) {
            console.log(i); // "4", "5", "6"
            firebase.database().ref('profile').orderByChild('jobtype/0/name').equalTo(i).on("child_added", function(item) {

                console.log(item.val().description);
                console.log(item.key);
                console.log(item.val().jobtype)
                 profiles.push({
                   id        : item.key,
                   jobtype : item.val().jobtype,
                   birthdate : item.val().birthdate,
                   phonenumber : item.val().phonenumber,
                   familyname : item.val().familyname,
                   association : item.val().association,
                   name : item.val().name,




                   image     : item.val().image,

                   description   : item.val().description,


              });
            });
            observer.next(profiles);
            observer.complete();

          }





      });
   }


   getOwnProfileProfile() : Observable<any>
   {
     var myUserId = firebase.auth().currentUser.uid;

      return new Observable(observer =>
      {

         let profiles : any = [];
         firebase.database().ref('profile').orderByChild('userId').equalTo(myUserId).on("child_added", function(item) {

             console.log(item.val().description);
             console.log(item.key);
             console.log(item.val().jobtype)
              profiles.push({
               id        : item.key,
               jobtype : item.val().jobtype,
               birthdate : item.val().birthdate,
               phonenumber : item.val().phonenumber,
               familyname : item.val().familyname,
               association : item.val().association,
               name : item.val().name,




               image     : item.val().image,

               description   : item.val().description,


           });
         });
         observer.next(profiles);
         observer.complete();


      });
   }



   deleteProfile(id) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         let ref = firebase.database().ref('profile').child(id);
         ref.remove();
         resolve(true);
      });
   }



   addToDatabase(profileObj) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         let addRef = firebase.database().ref('profile');
         addRef.push(profileObj);
         resolve(true);
      });
   }



   updateDatabase(id, profilesObj) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         var updateRef = firebase.database().ref('profile').child(id);
	      updateRef.update(profilesObj);
         resolve(true);
      });
   }



   uploadImage(imageString) : Promise<any>
   {
      let image       : string  = 'profile-' + new Date().getTime() + '.jpg',
          storageRef  : any,
          parseUpload : any;

      return new Promise((resolve, reject) =>
      {
         storageRef       = firebase.storage().ref('posters/' + image);
         parseUpload      = storageRef.putString(imageString, 'data_url');

         parseUpload.on('state_changed', (_snapshot) =>
         {
            // We could log the progress here IF necessary
            // console.log('snapshot progess ' + _snapshot);
         },
         (_err) =>
         {
            reject(_err);
         },
         (success) =>
         {
            resolve(parseUpload.snapshot);
         });
      });
   }

}
