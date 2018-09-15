import { Component } from '@angular/core';
import { NavController ,PopoverController, AlertController} from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import {NotificationsPage} from "../notifications/notifications";
import {ManageDocumentPage} from "../manage-document/manage-document";

import {MenuController } from 'ionic-angular';
import { AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

import { DatabaseProvider } from '../../providers/database/database';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 private _COLL 		: string 			= "Users";





 private _DOC 		: string 			= "Xy76Re34SdFR1";



 private _CONTENT  	: any;



 public locations     : any;

    constructor(public navCtrl: NavController,
       public authData: AuthData,
        public popoverCtrl: PopoverController,
         public menuctrl: MenuController,
       private _DB: DatabaseProvider,
        private _ALERT  : AlertController,
        public imagePicker: ImagePicker,
      private cropService: Crop) {
          this._CONTENT = {
                   nom 			: "Thomas",
                   age 	: "22",
                   emploi    : "Connard"
                };



  }

  ionViewDidEnter()
   {
      this.retrieveCollection();
   }


  logOut() {
      this.authData.logoutUser().then(() => {
          this.navCtrl.setRoot(Login);
      });


  }

  presentNotifications(myEvent) {

    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }


  generateCollectionAndDocument() : void
   {
      this._DB.createAndPopulateDocument(this._COLL,
                                         this._DOC,
                                         this._CONTENT)
      .then((data : any) =>
      {
         console.dir(data);
      })
      .catch((error : any) =>
      {
         console.dir(error);
      });
   }




   /**
    * Retrieve all documents from the specified collection using the
    * getDocuments method of the DatabaseProvider service


    */
   retrieveCollection() : void
   {
      this._DB.getDocuments(this._COLL)
      .then((data) =>
      {

         // IF we don't have any documents then the collection doesn't exist
         // so we create it!
         if(data.length === 0)
         {
            this.generateCollectionAndDocument();
         }

         // Otherwise the collection does exist and we assign the returned
         // documents to the public property of locations so this can be
         // iterated through in the component template
         else
         {
            this.locations = data;
         }
      })
      .catch();
   }




   /**
    * Navigate to the manage-document component to begin adding a new document
    *
    * @public
    * @method addDocument
    * @return {none}
    */
   addDocument() : void
   {
      this.navCtrl.push(ManageDocumentPage);
   }




   /**
    * Update a document by passing the data to the manage-document component
    *
    * @public
    * @method updateDocument
    * @param  obj          {Object}           The document data we wish to update
    * @return {none}
    */
   updateDocument(obj) : void
   {
      let params : any = {
         collection   : this._COLL,
         location     : obj
      };
      this.navCtrl.push(ManageDocumentPage, { record : params, isEdited : true });
   }




   /**
    * Delete a document from the Cloud Firestore collection using the
    * deleteDocument method of the DatabaseProvider service
    *
    * @public
    * @method deleteDocument
    * @param  obj          {Object}           The document ID for the document we wish to delete
    * @return {none}
    */
   deleteDocument(obj) : void
   {
      this._DB.deleteDocument(this._COLL,
      						obj.id)
      .then((data : any) =>
      {
         this.displayAlert('Success', 'The record ' + obj.city + ' was successfully removed');
      })
      .catch((error : any) =>
      {
         this.displayAlert('Error', error.message);
      });
   }




   /**
    * Provide feedback to user after an operation has succeeded/failed
    *
    * @public
    * @method displayAlert
    * @param  title          {String}           Heading for alert message
    * @param  message        {String}           Content for alert message
    * @return {none}
    */
   displayAlert(title      : string,
                message    : string) : void
   {
      let alert : any     = this._ALERT.create({
         title      : title,
         subTitle   : message,
         buttons    : [{
          text      : 'Got It!',
          handler   : () =>
          {
            this.retrieveCollection();
          }
        }]
      });
      alert.present();
   }

   uploadImage(imageURI){
  return new Promise<any>((resolve, reject) => {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child('image').child('imageName');
    this.encodeImageUri(imageURI, function(image64){
      imageRef.putString(image64, 'data_url')
      .then(snapshot => {
        resolve(snapshot.downloadURL)
      }, err => {
        reject(err);
      })
    })
  })
}

encodeImageUri(imageUri, callback) {
  var c = document.createElement('canvas');
  var ctx = c.getContext("2d");
  var img = new Image();
  img.onload = function () {
    var aux:any = this;
    c.width = aux.width;
    c.height = aux.height;
    ctx.drawImage(img, 0, 0);
    var dataURL = c.toDataURL("image/jpeg");
    callback(dataURL);
  };
  img.src = imageUri;
};

openImagePicker(){
  this.imagePicker.hasReadPermission().then(
    (result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }



  uploadImageToFirebase(image){
    //to do method
  }



  openImagePickerCrop(){
  this.imagePicker.hasReadPermission().then(
    (result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.cropService.crop(results[i], {quality: 75}).then(
                newImage => {
                  this.uploadImageToFirebase(newImage);
                },
                error => console.error("Error cropping image", error)
              );
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }




}
