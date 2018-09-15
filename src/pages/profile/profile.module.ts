import { NgModule } from '@angular/core';

import { ProfilePage } from './profile';

@NgModule({
  declarations: [
    ProfilePage,
  ],

  exports: [
    ProfilePage
  ]
})
export class ProfileModule {}
