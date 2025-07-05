import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterModule,Router  } from '@angular/router';

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
    private toastr: ToastrService,private router: Router ){ }

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
  loginSubmited() {
    if (this.loginForm.valid) {

      const datosLogin ={
        correo: this.f['correo']?.value,
        contrasena: this.f['contrasena']?.value
      }
        
      
      console.log("Esta es la respuestad del login",datosLogin)

      this.authService.login(datosLogin).subscribe(
        (respuesta) => {
          if (respuesta.token) {
            this.toastr.success('Inicio de sesión exitoso');
            localStorage.setItem('jwtToken', respuesta.token);
            localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
            this.userAutentication = true;
            this.loginForm.reset();
            this.router.navigate(['/inicio']);

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