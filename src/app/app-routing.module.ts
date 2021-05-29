import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ProjectsComponent} from './projects/projects.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {AssignmentsComponent} from './assignments/assignments.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { GisComponentComponent } from './gis-component/gis-component.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {path:"Home",component: HomeComponent},
  {path:"Projects",component: ProjectsComponent},
  {path:"ContactUs",component: ContactUsComponent},
  {path:"Assignments-TDF",component:AssignmentsComponent},
  {path:"Contact-Form-RF",component:ContactFormComponent},
  {path:"GISForm", component: GisComponentComponent},
  {path:"Search", component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
