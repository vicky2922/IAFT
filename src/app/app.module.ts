import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import { AppComponent } from './app.component';
import { LoginModuleComponent } from './login-module/login-module.component';
import { SqlServiceService } from './Services/sql-service.service';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginModuleComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ SqlServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
