import { Component, OnInit } from '@angular/core';
import { SqlServiceService } from '../Services/sql-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FlightObject } from "./FlightObject";
import {BookingObject } from "./BookingObject";
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  flights = [];
  FlightForm : FormGroup;
  
  username:string;
  emailid:string;
  isLogged:boolean;
  bookingObject : BookingObject;


  constructor(private sqlService : SqlServiceService, private route : Router) { }

  ngOnInit() {
    this.sqlService.callbackforlogin.emit('sent data...');

    this.sqlService.statusUpdate.subscribe(
      object => {
        alert(object);
        this.username = object.username;
        this.emailid = object.emailid;
        this.isLogged = object.flag;
      }
    );

    this.FlightForm = new FormGroup({
      'source' : new FormControl(''),
      'destination' : new FormControl(''),
      'jdate' : new FormControl('') 
    });
  }

  getFlights(){
    var flightData = new FlightObject(this.FlightForm.get('source').value, 
                                  this.FlightForm.get('destination').value,
                                  this.FlightForm.get('jdate').value);
      this.sqlService.getFlights(flightData).subscribe(
        data => {
          this.flights = data;
          console.log(this.flights);
        },
        error => {
          alert('server respond with '+error);
      }
      );
  }

  bookFlight(flightid:string){
    this.bookingObject = new BookingObject(flightid, this.username, this.emailid);

    this.sqlService.bookFlight(this.bookingObject).subscribe(
      data => {
        alert(data);
      },
      error => {
        alert("server respond with" + error);
      }
    );
  }

}
