import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";



// We MUST import both the firebase AND firestore modules like so
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class DatabaseProvider {


   private _DB : any;



   constructor(public http: Http)
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

   searchProfiles() : Observable<any>
   {

      return new Observable(observer =>
      {

         let profiles : any = [];
         firebase.database().ref('profile').orderByChild('userId').equalTo('0L7KR5zTNcNmY1AG5E4KSv956mi2').on("child_added", function(item) {

             console.log(item.val().description);
             console.log(item.key);
             console.log(item.val().jobtype)
              profiles.push({
               id        : item.key,
               jobtype : item.val().jobtype,


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
