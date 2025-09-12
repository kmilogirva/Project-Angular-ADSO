import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuarios/usuarios.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/shared/models/Usuario';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { ComboResponse } from 'src/app/models/Response/Generales/ComboResponse'
import { TablaUsuariosComponent } from '../tabla-usuarios/tabla-usuarios.component';
import { UsuarioResponse } from 'src/app/models/Response/Seguridad/UsuarioResponse';
@Component({
  selector: 'app-registrousuario',
  templateUrl: './registrousuario.component.html',
  styleUrls: ['./registrousuario.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent, TablaUsuariosComponent]
})
export class RegistroUsuariosComponent implements OnInit {
  usuarioForm!: FormGroup;
  cuentaCreada = false;
  repetircontrasena = 'none';
  roles: ComboResponse[] = [];
  usuarios: UsuarioResponse[] = []
  esEdicion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.InstanciarFormulario();
    this.cargarDataUsuarios();
    this.cargarComboRoles();
  };

  InstanciarFormulario(): void {
    this.usuarioForm = this.fb.group({
      idTercero: [],
      idUsuario: [],
      codUsuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      nombrecompleto: [''],
      correo: [''],
      telefono: [''],
      contrasena: [''],
      confirmarcontrasena: [''],
      idRol: ['', Validators.required],
      idEstado: [1, Validators.required],
      idUsuarioCreacion: [null],
      idUsuarioModificacion: [null],
      // idTipoDocumento: ['', Validators.required],
    },
      {
        validators: this.validacionContrasena('contrasena', 'confirmarcontrasena')
      }
    );
  }

  onEstadoToggle(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const nuevoEstado = isChecked ? 1 : 0;
    this.usuarioForm.patchValue({ idEstado: nuevoEstado });
  }

  validacionContrasena(pass1: string, pass2: string) {
    return (formGroup: AbstractControl) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control?.value !== pass2Control?.value) {
        pass2Control?.setErrors({ noIguales: true });
      } else {
        // Elimina el error si ya coinciden
        const errors = pass2Control?.errors;
        if (errors) {
          delete errors['noIguales'];
          if (Object.keys(errors).length === 0) {
            pass2Control.setErrors(null);
          } else {
            pass2Control.setErrors(errors);
          }
        }
      }
    };
  }

  get f() {
    return this.usuarioForm.controls;
  }

  registerSubmited(): void {
  if (this.usuarioForm.invalid) return;

  // 👇 definimos el estado de edición según idUsuario
  this.esEdicion = !!this.usuarioForm.value.idUsuario;

  const contrasena = this.f['contrasena'].value;
  const confirmar = this.f['confirmarcontrasena'].value;

  // 🔒 Validación de contraseñas
  if (contrasena !== confirmar) {
    this.repetircontrasena = 'inline';
    return;
  }

  const idUsuario = this.authService.obtenerIdUsuario();

  // 👉 Actualizamos el campo correcto según sea edición o creación
  if (this.esEdicion) {
    this.usuarioForm.patchValue({ idUsuarioModificacion: Number(idUsuario) });
  } else {
    this.usuarioForm.patchValue({ idUsuarioCreacion: Number(idUsuario) });
  }

  // Construcción del DTO
  const dto = { ...this.usuarioForm.value };

  // Elimina campos vacíos o nulos
for (const key in dto) {
  const value = dto[key];
  if (
    value === null ||
    value === undefined ||
    value === '' || // string vacío
    (typeof value === 'string' && value.trim() === '')
  ) {
    delete dto[key];
  }
}

  const usuario: Usuario = {
  idTercero: dto.idTercero,
  idUsuario: dto.idUsuario,
  codUsuario: dto.codUsuario,
  idRol: Number(dto.idRol),
  idEstado: dto.idEstado,
  ...(dto.contrasena ? { contrasena: dto.contrasena } : {}),
  ...(this.esEdicion
    ? { idUsuarioModificacion: dto.idUsuarioModificacion }
    : { idUsuarioCreacion: dto.idUsuarioCreacion })
};

  console.log("DTO a enviar:", usuario);

  // Acción según estado
  const accion = this.esEdicion
    ? this.usuarioService.actualizarUsuario(usuario)
    : this.usuarioService.crearUsuario(usuario);

  accion.subscribe({
    next: (res) => {
      console.log("Respuesta:", res);
      this.toastr.success(
        this.esEdicion
          ? 'Usuario actualizado correctamente'
          : 'Usuario registrado correctamente'
      );
      this.cargarDataUsuarios();
      this.usuarioForm.reset();
      this.repetircontrasena = 'none';
      this.esEdicion = false; // reset al terminar
    },
    error: (err) => {
      console.error("Error en la petición", err);
      this.toastr.error('Error al procesar la solicitud');
    }
  });
}


  cargarComboRoles(): void {
    this.authService.obtenerComboRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Error al cargar roles', err);
      }
    });
  }

  cargarDataUsuarios() {
    this.usuarioService.obtenerDataUsuarios().subscribe({
      next: (usuarios) => {
        console.log(usuarios)
        this.usuarios = usuarios
      },
      error: () => this.toastr.error('No se pudo cargar la datos de la tabla Usuarios')
    })
  }

llenarCamposFormulario(id: number): void {
  console.log("Entre al metodo llenarCamposFormulario()", id);
  if (!id) {
    this.toastr.warning('ID no válido');
    return;
  }

  this.usuarioService.obtenerUsuarioPorIdTercero(id).subscribe({
    next: (usuario) => {
      console.log(usuario);

      this.usuarioForm.patchValue({
        idTercero: usuario.idTercero,
        idUsuario: usuario.idUsuario,
        nombrecompleto: usuario.nombreCompleto,
        correo: usuario.email,
        telefono: usuario.telefono,
        codUsuario: usuario.codUsuario,
        idRol: usuario.idRol,
        idEstado: usuario.idEstado,
        idUsuarioCreacion: usuario.idUsuarioCreacion,
        idUsuarioModificacion: usuario.idUsuarioModificacion,

        contrasena: '',               // 👈 dejamos vacío
        confirmarcontrasena: ''  
      });

      // 👉 Quitar validación requerida en edición
      this.usuarioForm.get('contrasena')?.setValidators([Validators.minLength(6), Validators.maxLength(15)]);
      this.usuarioForm.get('confirmarcontrasena')?.clearValidators();

      this.usuarioForm.get('contrasena')?.updateValueAndValidity();
      this.usuarioForm.get('confirmarcontrasena')?.updateValueAndValidity();

      this.esEdicion = true;
    },
    error: () => this.toastr.error('No se pudo obtener el usuario')
  });
}



  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarioService.eliminarUsuarioPorId(id).subscribe({
        next: (response) => {
          this.toastr.success(response.mensaje);
          this.cargarDataUsuarios(); // Refrescar lista
        },
        error: (err) => {
          this.toastr.error(err.error.mensaje || 'Error al eliminar el usuario');
        }
      });
    }
  }

}
