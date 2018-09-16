


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';

import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-modals',
  templateUrl: 'modals.html'
})
export class ModalsPage {

   public form             : any;
   public filmImage  	   : any;
   public movies           : any;

   public movieImage       : any     = '';
   public movieGenres      : any     = [];

   public movieSummary     : any     = '';

   public movieId          : string  = '';
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
         'summary' 		: ['', Validators.minLength(10)],

         'image'		: [''],

         'jobtype' 		: ['', Validators.required]

      });

      this.movies = firebase.database().ref('profile/');


      if(params.get('isEdited'))
      {
          let movie 		    = params.get('profile'),
              k;


          this.movieSummary   	= movie.description;

          this.movieImage       = movie.image;
          this.filmImage        = movie.image;
          this.movieId          = movie.id;


          for(k in movie.jobtype)
          {
             this.movieGenres.push(movie.jobtype[k].name);
          }



          this.isEditable      = true;
      }
   }




   saveMovie(val)
   {
    //  this._LOADER.displayPreloader();

      let description 	: string 		= this.form.controls["summary"].value,

  		  jobtype  	: any		    = this.form.controls["jobtype"].value,

  		  image     : string        = this.filmImage,
  		  types     : any           = [],

  		  k         : any;


      for(k in jobtype)
      {
         types.push({
            "name" : jobtype[k]
         });
      }





      if(this.isEditable)
      {

         if(image !== this.movieImage)
         {
            this._DB.uploadImage(image)
            .then((snapshot : any) =>
            {
               let uploadedImage : any = snapshot.downloadURL;

               this._DB.updateDatabase(this.movieId,
               {

	              description  : description,


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

           this._DB.updateDatabase(this.movieId,
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
         this.filmImage = data;
      });
   }


}
