import { EventEmitter, Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {LoginObject} from "../login-module/LoginObject";
import 'rxjs/add/operator/map';
import { FlightObject } from '../homepage/FlightObject';
import { BookingObject } from '../homepage/BookingObject';

@Injectable()
export class SqlServiceService {

  private isLogged: boolean = false;             //keep detail of logged in username
  private userLogged: string = 'NotLoggedIn';    //NotLoggedIn //true only if user is logged in
  private emailLogged: string = 'NoEmailLoggedIn';

  userObjectLoggedIn = new EventEmitter<{_id:string,username: string, emailid:string, flag: false}>();

  statusUpdate = new EventEmitter<{_id:string ,username: string,emailid : string, flag: boolean }>();

  callbackforlogin = new EventEmitter<string>();

  setisLogged() {
    this.isLogged = true;
  }
  setuserLogged(value: string) {
    this.userLogged = value;
  }
  setemailLogged(value: string) {
    this.emailLogged = value;
  }

  getisLogged() {
    return this.isLogged;
  }

  getuserLogged() {
    return this.userLogged;
  }

  getemailLogged() {
    return this.emailLogged;
  }

  setLoggedOutValues() {
    this.isLogged = false;
    this.userLogged = 'NotLoggedIn';
    this.emailLogged = 'NoEmailLoggedIn';
    this.statusUpdate.emit({_id: 'NotID',username: 'NotLoggedIn', emailid: 'NoEmailLoggedIn', flag: false});
  }

  constructor(private http : Http) { }

  canLogin(loginObject: LoginObject) {
    console.log("sqlServiceConsole-:Login Attempt");
    return this.http.post('/userLogin', loginObject).map(res => res.json());
  }

  getFlights(flightObject: FlightObject) {
    console.log("sqlServiceConsole-:GetFlights attempt");
    return this.http.post('/getFlights', flightObject).map(res => res.json());
  }

  bookFlight(bookingObject: BookingObject) {
    console.log("sqlServiceConsole-:BookFLight attempt");
    return this.http.post('/bookFlight',bookingObject).map(res => res.json());
  }

  
  

}
