import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginModuleComponent } from './login-module/login-module.component';
import { HomepageComponent } from './homepage/homepage.component';

const appRoutes: Routes = [
  {path : '', component: LoginModuleComponent},
  {path: 'searchFlights', component : HomepageComponent}
  ]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes) //select root for our app
  ],
  exports: [RouterModule] //export router module

})
export class AppRoutingModule { }
