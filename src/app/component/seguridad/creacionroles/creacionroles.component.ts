import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Roles } from 'src/app/shared/models/roles.model';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TablaRolesComponent } from './tabla-roles/tabla-roles.component';

@Component({
  selector: 'app-creacionroles',
  templateUrl: './creacionroles.component.html',
  styleUrls: ['./creacionroles.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    ReactiveFormsModule,
    CommonModule,
    TablaRolesComponent,
  ],
})
export class CreacionrolesComponent implements OnInit {
  rolesForm!: FormGroup;
  roles: Roles[] = [];
  cargando = false;
  editando = false;
  rolId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.instanciarFormulario();
    this.cargarRoles();
  }

  // 1. Definir formulario con los nombres EXACTOS como están en backend y HTML
  instanciarFormulario(): void {
    this.rolesForm = this.fb.group({
      IdRol: [''],
      NombreRol: ['', Validators.required],
      IdEstado: [true, Validators.required],

      IdUsuarioCreacion: [''],
    });
  }

  // Getter para simplificar el acceso a los controles en el HTML
  get f() {
    return this.rolesForm.controls;
  }

  // 2. Traer roles desde el backend
  cargarRoles(): void {
    this.cargando = true;
    this.authService.obtenerRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.cargando = false;
      },
      error: () => {
        this.toastr.error('Error al cargar roles');
        this.cargando = false;
      },
    });
  }

  // 3. Editar: llena el formulario con el rol seleccionado
  editarRol(rol: Roles): void {
    this.editando = true;
    this.rolId = rol.id;

    this.rolesForm.patchValue({
      IdRol: rol.id,
      NombreRol: rol.nombreRol,
      IdEstado: rol.idEstado,
      IdUsuarioCreacion: '', // se llenará al guardar
    });
  }

  // 4. Guardar: crea o actualiza según corresponda
  onSubmit() {
    if (this.rolesForm.invalid) {
      this.rolesForm.markAllAsTouched();
      return;
    }

    const idUsuario = this.authService.obtenerIdUsuario();
    this.rolesForm.patchValue({ IdUsuarioCreacion: idUsuario });

    const rolData = this.rolesForm.value;

    // Editar (PUT)
    if (this.editando && this.rolId) {
      this.authService.actualizarRol(this.rolId, rolData).subscribe({
        next: (response) => {
          if (response.exitoso) {
            this.toastr.success(response.mensaje);
            this.resetForm();
            this.cargarRoles();
          } else {
            this.toastr.error(response.mensaje);
          }
        },
        error: () => {
          this.toastr.error('Error al actualizar el rol');
        },
      });
    }
    // Crear (POST)
    else {
      this.authService.crearRol(rolData).subscribe({
        next: (response: any) => {
          console.log('Esto recibo', response);
          if (response && response.mensaje) {
            this.toastr.success(response.mensaje || 'Rol creado correctamente');
            this.resetForm();
            this.cargarRoles();
          } else {
            this.toastr.error('Error al crear el rol');
          }
        },
        error: () => {
          this.toastr.error('Error al registrar el rol');
        },
      });
    }
  }

  // 5. Limpiar formulario
  resetForm(): void {
    this.rolesForm.reset({ IdEstado: true }); // ¡OJO! Ahora está con I mayúscula
    this.editando = false;
    this.rolId = null;
  }

  eliminarRol(id: number) {
    if (confirm('¿Estás seguro de eliminar este rol?')) {
      this.authService.eliminarRol(id).subscribe({
        next: (response) => {
          this.toastr.success(response.mensaje || 'Rol eliminado exitosamente');
          this.cargarRoles(); // Recarga la lista
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err.error?.mensaje || 'Error al eliminar el rol');
        },
      });
    }
  }

  // onSubmit() {
  //   if (this.rolesForm.invalid) return;

  //   const idUsuario = this.authService.obtenerIdUsuario();
  //   this.rolesForm.patchValue({ IdUsuarioCreacion: idUsuario });

  //   const nuevoRol = this.rolesForm.value;

  //   this.authService.crearRol(nuevoRol).subscribe({
  //     next: (response) => {
  //       this.toastr.success(response.mensaje);
  //       this.rolesForm.reset();
  //     },
  //     error: (err) => {
  //       if (err.status === 409) {
  //         this.toastr.warning(err.error.mensaje);
  //       } else {
  //         this.toastr.error('Error al registrar el rol');
  //       }
  //     }
  //   });
  // }
}
