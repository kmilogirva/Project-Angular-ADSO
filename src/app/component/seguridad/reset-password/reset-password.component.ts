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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private recuperarService: RecuperacionService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Capturo el token de la ruta
    this.route.params.subscribe((params) => {
      this.token = params['token'];
      if (!this.token) {
        this.toastr.error('Token no encontrado en la URL.');
        // this.router.navigate(['/acceso']);
      }
    });

    // Creo el formulario reactivo
    this.resetPasswordForm = this.fb.group(
      {
        contrasena: ['', [Validators.required, Validators.minLength(8)]],
        confirmarContrasena: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator, // 👈 OJO: es "validators" (plural)
      }
    );
  }

  // Validador de coincidencia de contraseñas
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
        contrasena: contrasena,
      };

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
