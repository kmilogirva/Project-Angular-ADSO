import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/Autenticacion/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  repetircontrasena: string = 'none';
  displayMsg: string ='';
  isAccountCreated:boolean= false;

  constructor(private fb: FormBuilder,
    private authService : AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void { 
    this.instanciarFormulario();
  }


  instanciarFormulario() : void{
    this.registerForm = this.fb.group({
      nombres: ["", [Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]],
      apellidos: ["", [Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]],
      correo: ["", [Validators.required,Validators.email]],
      telefono: ["", [Validators.required,Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.maxLength(10)]],
      sexo: ["", [Validators.required]],
      contraseña: ["", [Validators.required,Validators.minLength(6),Validators.maxLength(15),]],
      confirmarcontrasena: [""]
    })
  }

  get f(){
    return this.registerForm.controls;

  }
  
  registerSubmited() {
    if (this.Contrasena.value === this.ConfirmarContrasena.value) {
      this.repetircontrasena = 'none'; 
      console.log("Entre al metodo Registrar")

      //console.log(this.registerForm.valid);
      const datosRegistroUsuario =[
        this.f['nombres']?.value,
        // this.registerForm.value.nombres!,
        this.f['apellidos']?.value,
        // this.registerForm.value.apellidos!,
        this.f['correo']?.value,
        // this.registerForm.value.correo!,
        this.f['telefono']?.value,
        // this.registerForm.value.telefono!,
        this.f['sexo']?.value,
        // this.registerForm.value.sexo!,
        this.f['contraseña']?.value,
        // this.registerForm.value.contraseña!,
      ];
      console.log()

      this.authService.registerUser(datosRegistroUsuario).subscribe(
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
