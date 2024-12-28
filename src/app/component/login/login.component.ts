import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userAutentication: boolean =false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService : AuthService, public toastr: ToastrService ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(15),]]

    });
  }

  get Correo() {
    return this.loginForm.get('correo');
  }

  get Contrasena() {
    return this.loginForm.get('contrasena');
  }

  loginSubmited() {
    if (this.loginForm.valid) {

      const loginData =[

        this.loginForm.value.correo!,
        this.loginForm.value.contrasena!,
      ]


      this.authService.login(loginData).subscribe(
        (response) =>{

          if (response.exitoso){
            this.toastr.success(response.mensaje);
            this.userAutentication = true;
            this.loginForm.reset();
          }
          else{
            this.toastr.error(response.mensaje);
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
