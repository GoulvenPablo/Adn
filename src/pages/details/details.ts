import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class Details {

  rate: any;
  like: any;

  public form             : any;
  public newProfileImage  	   : any;
  public profiles           : any;

  public profileImage        : any     = '';
  public JobType      : any     = [];

  public profileDescription     : any     = '';
  public Birthdate : any = '';
  public phoneNumber : any = '';
  public Association : any = '';
  public Password : any = '';

  public profileId          : string  = '';
  public Name          : string  = '';
  public familyName          : string  = '';
  public isEditable       : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.rate=2;

    if(navParams.get('isEdited'))
    {
        let profile		    = navParams.get('profile'),
            k;

        //this.Name = profile.name;
        //this.familyName = profile.familyname;
        this.profileDescription   	= profile.description;
        this.Association = profile.association;
        this.Birthdate = profile.birthdate;
        this.phoneNumber = profile.phonenumber;
        this.Name = profile.name;
        this.familyName = profile.familyname;
        this.profileImage       = profile.image;
        
        this.profileId          = profile.id;


        for(k in profile.jobtype)
        {
           this.JobType.push(profile.jobtype[k].name);
        }



        this.isEditable      = true;
        console.log(this.familyName)
    }
  }

// share modal function
  presentshareModal() {
   let shareModal = this.modalCtrl.create('ShareModal', { userId: 8675309 });
   shareModal.present();
 }

//activeLike function
  activeLike(){
    this.like = !this.like;
  }

// comment modal
  commentModal() {
    let pageModal = this.modalCtrl.create('CommentmodalPage');
    pageModal.present();
  }

}
