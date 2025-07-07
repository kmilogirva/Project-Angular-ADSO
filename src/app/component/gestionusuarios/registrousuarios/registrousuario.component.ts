import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuarios/usuarios.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/shared/models/Usuario';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-registrousuario',
  templateUrl: './registrousuario.component.html',
  styleUrls: ['./registrousuario.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent]
})
export class RegistroUsuariosComponent implements OnInit {
  usuarioForm!: FormGroup;
  cuentaCreada = false;
  repetircontrasena = 'none';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService : UsuarioService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      sexo: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmarcontrasena: ['', Validators.required]
    });
  }

  get f() {
    return this.usuarioForm.controls;
  }

  registerSubmited(): void {
    // Verificamos si el formulario es válido y las contraseñas coinciden
    const idUsuario = this.authService.obtenerIdUsuario();

    if (this.usuarioForm.valid && this.f['contraseña'].value === this.f['confirmarcontrasena'].value) {
      const usuario: Usuario = {
        nombres: this.f['nombres'].value,
        apellidos: this.f['apellidos'].value,
        correo: this.f['correo'].value,
        telefono: this.f['telefono'].value,
        sexo: this.f['sexo'].value,
        contrasena: this.f['contraseña'].value,
        idUsuarioCreacion: Number(idUsuario)
        // rol: ['Admin', 'Auxiliar']
      };
      console.log(usuario)
      this.usuarioService.crearUsuario(usuario).subscribe({
        next: (response) => {
          if (response.exitoso) {
            this.toastr.success(response.mensaje);
            this.cuentaCreada = true;
            this.usuarioForm.reset();
            this.repetircontrasena = 'none';
          } else {
            this.toastr.error(response.mensaje);
            this.cuentaCreada = false;
          }
        },
        error: () => {
          this.toastr.error('Error al registrar el usuario');
          this.cuentaCreada = false;
        }
      });
    } else {
      // Si las contraseñas no coinciden, mostramos el mensaje
      this.repetircontrasena = 'inline';
    }
  }
}
