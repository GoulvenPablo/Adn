


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';

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

         'genres' 		: ['', Validators.required]

      });

      this.movies = firebase.database().ref('films/');


      if(params.get('isEdited'))
      {
          let movie 		    = params.get('movie'),
              k;


          this.movieSummary   	= movie.summary;

          this.movieImage       = movie.image;
          this.filmImage        = movie.image;
          this.movieId          = movie.id;


          for(k in movie.genres)
          {
             this.movieGenres.push(movie.genres[k].name);
          }



          this.isEditable      = true;
      }
   }




   saveMovie(val)
   {
      this._LOADER.displayPreloader();

      let summary 	: string 		= this.form.controls["summary"].value,

  		  genres  	: any		    = this.form.controls["genres"].value,

  		  image     : string        = this.filmImage,
  		  types     : any           = [],
  		  people    : any           = [],
  		  k         : any;


      for(k in genres)
      {
         types.push({
            "name" : genres[k]
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

	              summary  : summary,


	              image    : uploadedImage,
	              genres   : types

	           })
               .then((data) =>
               {
                  this._LOADER.hidePreloader();
               });

            });
         }
         else
         {

           this._DB.updateDatabase(this.movieId,
           {

	          summary  : summary,


	          genres   : types

	       })
           .then((data) =>
           {
              this._LOADER.hidePreloader();
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
	           summary  : summary,

	           genres   : types

	        })
            .then((data) =>
            {
               this._LOADER.hidePreloader();
            });
         });

      }
      else if(image == null)
      {


        this._DB.addToDatabase({


        summary  : summary,

        genres   : types

         })
            .then((data) =>
            {
               this._LOADER.hidePreloader();
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
