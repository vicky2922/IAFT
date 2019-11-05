export class BookingObject{
    flightid:string;
    bookedBy: string;
    emailid:string;
  
    constructor(flightid:string,
        bookedBy: string,emailid:string){
    this.flightid=flightid;
      this.bookedBy= bookedBy;
     this.emailid=emailid;
    }
  }