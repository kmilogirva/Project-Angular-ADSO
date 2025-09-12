import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { SolicitudRecuperacion } from 'src/app/models/Response/Seguridad/SolicitudRecuperacion';
import { RecuperacionService } from 'src/app/core/services/recuperacion.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recuperarService: RecuperacionService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      // const solicitud: SolicitudRecuperacion = { email: email };
      this.recuperarService.solicitarRecuperacion(email).subscribe({
        next: (response) => {
          if (response.exitoso) {
            this.toastr.success('Se ha enviado un correo de recuperación.');
            //Redirigir a la vista de RestablecerContraseña
            // this.router.navigate(['/acceso']);
          } else {
            this.toastr.error(response.mensaje);
          }
        },
        error: (err) => {
          this.toastr.error('Ocurrió un error al procesar la solicitud.');
          console.error('Error en la solicitud de recuperación:', err);
        },
      });
    }
  }
}
