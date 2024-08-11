import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    email : new FormControl("", [
      Validators.required,
      Validators.email
    ]),



    password: new FormControl("")
  });




  get Email(): FormControl {
    return this.Email.get("email") as FormControl;
  }

  get Password(): FormControl {
    return this.Password.get("password") as FormControl;
  }

  
 loginSubmited(){
console.log(this.loginForm.value)
alert(this.loginForm.value)
this.loginForm
  }
}
