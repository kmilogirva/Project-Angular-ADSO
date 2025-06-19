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
      const datosLogin = {
        correo: this.f['correo'].value,
        contrasena: this.f['contrasena'].value
      };

      this.authService.login(datosLogin).subscribe({
        next: (respuesta) => {
          if (respuesta.token) {
            this.toastr.success('Inicio de sesión exitoso');
            localStorage.setItem('jwtToken', respuesta.token);
            // console.log("Esta es mi token" + respuesta.token)
            localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
            // console.log("Este es mi json de usaurio" + respuesta.usuario)
            this.userAutentication = true;
            this.loginForm.reset();
            // Redirige a otra ruta si es necesario
          } else {
            this.toastr.error(respuesta.mensaje ?? 'Credenciales inválidas');
            this.userAutentication = false;
          }
        },
        error: (error) => {
          const msg = error?.error?.mensaje ?? 'Error al iniciar sesión';
          this.toastr.error(msg);
          this.userAutentication = false;
        }
      });
    } else {
      this.toastr.warning('Por favor completa todos los campos obligatorios');
    }
  }
}
