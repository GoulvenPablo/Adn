import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProjectsPage } from './projects';

@NgModule({
  declarations: [
    ProjectsPage,
  ],
  imports: [
    IonicModule.forChild(ProjectsPage),
  ],
  exports: [
    ProjectsPage
  ]
})
export class ProjectsPageModule {}
