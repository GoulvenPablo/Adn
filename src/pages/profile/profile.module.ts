import { NgModule } from '@angular/core';

import { profile } from './signup';

@NgModule({
  declarations: [
    profile,
  ],

  exports: [
    profile
  ]
})
export class ProfileModule {}
