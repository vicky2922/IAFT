import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LoginObject} from "./LoginObject";
import { SqlServiceService } from '../Services/sql-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.css']
})
export class LoginModuleComponent implements OnInit {

  LoginForm: FormGroup;
  
  errorMessageFlag: boolean = false;

  constructor(private sqlService : SqlServiceService, private route : Router) { }

  ngOnInit() {
    this.LoginForm = new FormGroup({
      'username': new FormControl(''),
      'password': new FormControl(''),
    });
  }

  Login(){
    var prUser = new LoginObject(this.LoginForm.get('username').value, 
                                  this.LoginForm.get('password').value);

    this.sqlService.canLogin(prUser).subscribe(
      LoginData => {
        console.log(prUser);
        console.log(LoginData);
        console.log(LoginData[0].username);
        if(LoginData[0].username === prUser.username && LoginData[0].password === prUser.password){
          
          this.sqlService.statusUpdate.emit({
            _id:LoginData[0]._id,
            username:LoginData[0].username,
            emailid:LoginData[0].emailid,
            flag:true
          });

          this.sqlService.setisLogged(); //Creating session
          this.sqlService.setuserLogged(LoginData[0].username);
          this.sqlService.setemailLogged(LoginData[0].email);

          
          this.route.navigate(['/searchFlights']);
        }
        else {
          alert("Invalid username or password");
          this.sqlService.setLoggedOutValues();
          this.errorMessageFlag = true;
        }
      },
      error => {
        alert("Server Responded with Error!" + error)
      },
      () => console.log("Subscrib is completed.")
    );
    
  }

}

