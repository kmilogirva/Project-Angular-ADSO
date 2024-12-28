import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
 

})
export class RegisterComponent implements OnInit {
  repetircontrasena: string = 'none';
  displayMsg: string ='';
  isAccountCreated:boolean= false;

  constructor(private authService : AuthService, public toastr: ToastrService) { }

  ngOnInit(): void { }
  
  registerForm = new FormGroup({
    nombres: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z].*")
    ]),
    apellidos: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z].*")
    ]),
    correo: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    telefono: new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]*"),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    sexo: new FormControl("", [
      Validators.required
    ]),

    contraseña: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    confirmarcontrasena: new FormControl("")
  });

  

  registerSubmited() {
    if (this.Contrasena.value === this.ConfirmarContrasena.value) {
      this.repetircontrasena = 'none'; 
      console.log("Entre al metodo Registrar")

      //console.log(this.registerForm.valid);
      const UserData =[
        this.registerForm.value.nombres!,
        this.registerForm.value.apellidos!,
        this.registerForm.value.correo!,
        this.registerForm.value.telefono!,
        this.registerForm.value.sexo!,
        this.registerForm.value.contraseña!,
      ];
      console.log()

      this.authService.registerUser(UserData).subscribe(
        (response) =>{
        if (response.exitoso){
          this.toastr.success (response.mensaje) 
          this.isAccountCreated =true;
          this.registerForm.reset();
          this.repetircontrasena = 'none'; 
        } else {
          this.toastr.error(response.mensaje);
          this.isAccountCreated = false;
        }
      },
      (error) => {
        console.error("Error en la llamada al backend:", error);
        this.toastr.error(error.mensaje);
        this.isAccountCreated = false;
      }
    );
  } else {
    this.repetircontrasena = 'inline';
  }
}

  get Nombres(): FormControl {
    return this.registerForm.get("nombres") as FormControl;
  }

  get Apellidos(): FormControl {
    return this.registerForm.get("apellidos") as FormControl;
  }

  get Correo(): FormControl {
    return this.registerForm.get("correo") as FormControl;
  }

  get Telefono(): FormControl {
    return this.registerForm.get("telefono") as FormControl;
  }

  get Sexo(): FormControl {
    return this.registerForm.get("sexo") as FormControl;
  }

  get Contrasena(): FormControl {
    return this.registerForm.get("contraseña") as FormControl;
  }

  get ConfirmarContrasena(): FormControl {
    return this.registerForm.get("confirmarcontrasena") as FormControl;
  }
}
