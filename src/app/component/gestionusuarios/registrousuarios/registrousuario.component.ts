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
  usuarios: Usuario[] = []

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
      idUsuario: [],
      nombre1: ['', Validators.required],
      nombre2: [''],
      apellido1: ['', Validators.required],
      apellido2: [''],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmarcontrasena: ['', Validators.required],
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

    const esEdicion = this.usuarioForm.value.idUsuario != null;
    console.log(esEdicion)
    const contrasena = this.f['contrasena'].value;
    const confirmar = this.f['confirmarcontrasena'].value;

    if (contrasena !== confirmar) {
      this.repetircontrasena = 'inline';
      return;
    }

    const idUsuario = this.authService.obtenerIdUsuario();

    if (!esEdicion) {
      this.usuarioForm.patchValue({ idUsuarioCreacion: Number(idUsuario) });
    } else {
      this.usuarioForm.patchValue({ idUsuarioModificacion: Number(idUsuario) });
    }

    const dto = { ...this.usuarioForm.value };
    //Elimina campos vacios o nulos
    for (const key in dto) {
      if (typeof dto[key] === 'string' && dto[key].trim() === '') {
        delete dto[key];
      }
    }

    const accion = esEdicion
      ? this.usuarioService.actualizarUsuario(dto)
      : this.usuarioService.crearUsuario(dto);

    accion.subscribe({
      next: (res) => {
        console.log("Respuesta:", res);
        this.toastr.success(
          esEdicion ? 'Usuario actualizado correctamente' : 'Usuario registrado correctamente'
        );
        this.cargarDataUsuarios();
        this.usuarioForm.reset();
        this.repetircontrasena = 'none';
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
    this.usuarioService.obtenerListadoUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios
      },
      error: () => this.toastr.error('No se pudo cargar la datos de la tabla Usuarios')
    })
  }

  llenarCamposFormulario(id: number): void {
    console.log("Entre al metodo llenarCamposFormulario()", id)
    if (!id) {
      this.toastr.warning('ID no válido');
      return;
    }

    this.usuarioService.obtenerUsuarioPorId(id).subscribe({
      next: (usuario) => {
        console.log(usuario)
        this.usuarioForm.patchValue({
          idUsuario: usuario.idUsuario,
          nombre1: usuario.nombre1,
          nombre2: usuario.nombre2,
          apellido1: usuario.apellido1,
          apellido2: usuario.apellido2,
          correo: usuario.correo,
          telefono: usuario.telefono,
          contrasena: usuario.contrasena,
          confirmarcontrasena: usuario.contrasena,
          idRol: usuario.idRol,
          idEstado: usuario.idEstado,
          idUsuarioCreacion: usuario.idUsuarioCreacion,
          idUsuarioModificacion: usuario.idUsuarioModificacion,
        });

        // this.idUsuarioEnEdicion = id; // Puedes usarlo si necesitas saber si estás editando
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
