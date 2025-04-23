import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from 'src/app/services/Autenticacion/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule]
})
export class LoginComponent implements OnInit {
  userAutentication: boolean =false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService : AuthService,
    private toastr: ToastrService ){ }

  ngOnInit(): void {
    this.instanciarFormulario();
  }

  instanciarFormulario(): void{
    this.loginForm= this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(15),]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  // get Correo() {
  //   return this.f['correo'].value();
  // }

  // get Contrasena() {
  //   return this.loginForm.get('contrasena');
  // }

  loginSubmited() {
    if (this.loginForm.valid) {

      const datosLogin ={
        correo: this.f['correo']?.value,
        contrasena: this.f['contrasena']?.value
      }
        
      
      console.log("Esta es la respuestad del login",datosLogin)

      this.authService.login(datosLogin).subscribe(
        (respuesta) => {
            console.log(respuesta)
          if (respuesta.token) {
            this.toastr.success('Inicio de sesión exitoso');
            // Guardar el token y la información del usuario
            localStorage.setItem('token', respuesta.token);
            localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
            // this.usuario = respuesta.usuario;  // Puedes asignarlo a una variable para uso posterior

            this.userAutentication = true;
            this.loginForm.reset();

          } else {
            this.toastr.error(respuesta.mensaje);
            this.userAutentication = false;
          }
        },
        (error) => {
          console.error("Error en la llamada al backend:", error);
          this.toastr.error(error.mensaje);
          this.userAutentication = false;
        }
      );
    
    } else {
      alert('Formulario inválido');
    }
  }
}
