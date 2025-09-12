import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import { AuthService } from 'src/app/core/services/auth.service';
import { RestablecerContrasena } from 'src/app/models/Response/Seguridad/RestablecerContrasena';
import { RecuperacionService } from 'src/app/core/services/recuperacion.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  token!: string;
  tokenValido: boolean = false;
  cargando: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private recuperarService: RecuperacionService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Capturo el token de la ruta
    this.route.params.subscribe((params) => {
      this.token = params['token'];

      if (!this.token) {
        this.toastr.error('Token no encontrado en la URL.');
        this.cargando = false;
        return;
      }
      this.verificarToken();
    });

    this.resetPasswordForm = this.fb.group(
      {
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        confirmarContrasena: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  private verificarToken(): void {
    this.recuperarService.validarToken(this.token).subscribe({
      next: (res) => {
        this.tokenValido = res.valido;
        this.cargando = false;
      },
      error: () => {
        this.tokenValido = false;
        this.cargando = false;
      },
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('contrasena')?.value;
    const confirmPassword = formGroup.get('confirmarContrasena')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const { contrasena } = this.resetPasswordForm.value;
      const datos: RestablecerContrasena = {
        token: this.token,
        nuevaContrasena: contrasena,
      };

      console.log('Datos para restablecer contraseña:', datos);
      this.recuperarService.restablecerContrasena(datos).subscribe({
        next: () => {
          // La petición fue exitosa, aunque no recibimos contenido
          this.toastr.success('Contraseña restablecida correctamente.');
          this.router.navigate(['/acceso']);
        },
        error: (err) => {
          this.toastr.error('Ocurrió un error al procesar la solicitud.');
          console.error('Error en la solicitud de restablecimiento:', err);
        },
      });
    }
  }

  get f() {
    return this.resetPasswordForm.controls;
  }
}
