import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent implements OnInit {
  userAutentication: boolean = false;
  loginForm!: FormGroup;
  private returnUrl: string = '/inicio';  // 👈 por defecto inicio

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute  // 👈 para leer query params
  ) {}

  ngOnInit(): void {
    this.instanciarFormulario();
    // Si existe ?returnUrl=xxx en la URL lo tomamos
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inicio';
  }

  instanciarFormulario(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  loginSubmited() {
    if (this.loginForm.valid) {
      const datosLogin = {
        correo: this.f['correo']?.value,
        contrasena: this.f['contrasena']?.value
      };

      this.authService.login(datosLogin).subscribe({
        next: (respuesta) => {
          if (respuesta?.token) {
            this.toastr.success('Inicio de sesión exitoso');
            localStorage.setItem('jwtToken', respuesta.token);
            localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
            this.userAutentication = true;
            this.loginForm.reset();

            // 👇 Aquí respetamos el returnUrl, si no hay usamos '/inicio'
            this.router.navigateByUrl(this.returnUrl);

          } else {
            this.toastr.error('Error inesperado, comuníquese con el Administrador');
            this.userAutentication = false;
          }
        },
        error: (error) => {
          console.error("Error en la llamada al backend:", error);
          if (error.status === 401) {
            this.toastr.warning('Credenciales incorrectas. Si el problema persiste, comuníquese con el Administrador.');
          } else {
            this.toastr.error(error?.mensaje || 'Error en el servidor. Comuníquese con el Administrador.');
          }
          this.userAutentication = false;
        }
      });
    } else {
      alert('Formulario inválido');
    }
  }
}
