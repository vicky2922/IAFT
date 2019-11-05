export class FlightObject{
    source: string;
    destination: string;
    jdate: string;
  
    constructor(source: string, destination: string, jdate: string){
      this.source=source;
      this.destination=destination;
      this.jdate = jdate;
    }
  }