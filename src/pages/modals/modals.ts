


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';


import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-modals',
  templateUrl: 'modals.html'
})
export class ModalsPage {

   public form             : any;
   public newProfileImage  	   : any;
   public profiles           : any;

   public profileImage        : any     = '';
   public JobType      : any     = [];

   public profileDescription     : any     = '';

   public profileId          : string  = '';
   public isEditable       : boolean = false;


   constructor(
      public navCtrl        : NavController,
      public params         : NavParams,
      private _FB 	        : FormBuilder,
      private _IMG          : ImageProvider,
      public viewCtrl       : ViewController,
      private _LOADER       : PreloaderProvider,
      private _DB           : DatabaseProvider
   )
   {
      this.form 		= _FB.group({
         'description' 		: ['', Validators.minLength(10)],

         'image'		: [''],

         'jobtype' 		: ['', Validators.required]

      });

      this.profiles = firebase.database().ref('profile/');


      if(params.get('isEdited'))
      {
          let profile		    = params.get('profile'),
              k;


          this.profileDescription   	= profile.description;

          this.profileImage       = profile.image;
          this.newProfileImage        = profile.image;
          this.profileId          = profile.id;


          for(k in profile.jobtype)
          {
             this.JobType.push(profile.jobtype[k].name);
          }



          this.isEditable      = true;
      }
   }




   saveMovie(val)
   {
    //  this._LOADER.displayPreloader();

      let description 	: string 		= this.form.controls["description"].value,

  		  jobtype  	: any		    = this.form.controls["jobtype"].value,

  		  image     : string        = this.newProfileImage,
  		  types     : any           = [],

  		  k         : any;


      for(k in jobtype)
      {
         types.push({
            "name" : jobtype[k]
         });
      }


      var myUserId = firebase.auth().currentUser.uid;
      console.log(myUserId);


      if(this.isEditable)
      {

         if(image !== this.profileImage)
         {
            this._DB.uploadImage(image)
            .then((snapshot : any) =>
            {
               let uploadedImage : any = snapshot.downloadURL;

               this._DB.updateDatabase(this.profileId,
               {

	              description  : description,
                userId : myUserId,


	              image    : uploadedImage,
	              jobtype  : types

	           })
               .then((data) =>
               {
                //  this._LOADER.hidePreloader();
               });

            });
         }
         else
         {

           this._DB.updateDatabase(this.profileId,
           {

	          description  : description,



	          jobtype   : types

	       })
           .then((data) =>
           {
            //  this._LOADER.hidePreloader();
           });
	     }

      }
      else if (image !=null)
      {
         this._DB.uploadImage(image)
         .then((snapshot : any) =>
         {
            let uploadedImage : any = snapshot.downloadURL;

            this._DB.addToDatabase({

	           image    : uploadedImage,
	           description  : description,


	           jobtype   : types

	        })
            .then((data) =>
            {
              this.navCtrl.setRoot(HomePage);
              // this._LOADER.hidePreloader();
            });
         });

      }
      else if(image == null)
      {


        this._DB.addToDatabase({


        description  : description,
        userId : myUserId,

        jobtype   : types

         })
            .then((data) =>
            {
              this.navCtrl.setRoot(HomePage);
            //   this._LOADER.hidePreloader();
            });


      }
      this.closeModal(true);
   }



   closeModal(val = null)
   {
      this.viewCtrl.dismiss(val);
   }



   selectImage()
   {
      this._IMG.selectImage()
      .then((data) =>
      {
         this.newProfileImage = data;
      });
   }


}
