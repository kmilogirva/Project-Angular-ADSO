import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  repeatPass: string = 'none';

  displayMsg: string ='';
  isAccountCreated:boolean= false;

  constructor(private authService : AuthService, public toastr: ToastrService) { }

  ngOnInit(): void { }
  
  registerForm = new FormGroup({
    firstname: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z].*")
    ]),
    lastname: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z].*")
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    mobile: new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]*"),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    gender: new FormControl("", [
      Validators.required
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    confirmpassword: new FormControl("")
  });

  

  registerSubmited() {
    if (this.Password.value === this.ConfirmPassword.value) {
      this.repeatPass = 'none'; 

      //console.log(this.registerForm.valid);
      this.authService.registerUser([
        this.registerForm.value.firstname!,
        this.registerForm.value.lastname!,
        this.registerForm.value.email!,
        this.registerForm.value.mobile!,
        this.registerForm.value.gender!,
        this.registerForm.value.password!,

      ]).subscribe(res => {
        if (res == 'Success'){
          this.toastr.success ('Cuenta creada, exitosamente') 
          this.isAccountCreated =true;
        }else if (res =='Usuario ya existe'){
          this.toastr.error ('La cuenta ya existe,el correo ya se encuentra registrado');
          this.isAccountCreated =false;
        }else {
          this.toastr.error ('Algo salió mal');
          this.isAccountCreated =false;
        }
      });
    } else {
      this.repeatPass = 'inline'; 

    }
  }

  get FirstName(): FormControl {
    return this.registerForm.get("firstname") as FormControl;
  }

  get LastName(): FormControl {
    return this.registerForm.get("lastname") as FormControl;
  }

  get Email(): FormControl {
    return this.registerForm.get("email") as FormControl;
  }

  get Mobile(): FormControl {
    return this.registerForm.get("mobile") as FormControl;
  }

  get Gender(): FormControl {
    return this.registerForm.get("gender") as FormControl;
  }

  get Password(): FormControl {
    return this.registerForm.get("password") as FormControl;
  }

  get ConfirmPassword(): FormControl {
    return this.registerForm.get("confirmpassword") as FormControl;
  }
}
