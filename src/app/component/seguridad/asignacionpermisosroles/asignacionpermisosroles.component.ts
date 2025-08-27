import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { ComboResponse } from 'src/app/models/Response/Generales/ComboResponse';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModuloService } from 'src/app/services/Modulos/modulo.service';
import { Modulo } from 'src/app/models/modulos/Modulo';
import { ToastrService } from 'ngx-toastr';
import { Submodulo } from 'src/app/models/modulos/Submodulo';
// import { SubmoduloPermiso } from 'src/app/models/modulos/Submodulo';
import { RolesPermisosAccion } from 'src/app/models/modulos/RolesPermisosAccion';
import { Usuario } from 'src/app/shared/models/Usuario';


// interface SubmoduloPermiso {
//   idModulo: number;
//   nombreModulo: string;
//   nombreSubmodulo: string;
//   ver: boolean;
//   crear: boolean;
//   editar: boolean;
//   eliminar: boolean;
// }

@Component({
  selector: 'app-asignacionpermisosroles',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent, CommonModule],
  templateUrl: './asignacionpermisosroles.component.html',
  styleUrl: './asignacionpermisosroles.component.scss'
})




export class AsignacionpermisosrolesComponent implements OnInit {

  asignacionPermisosForm!: FormGroup
  todosLosSubmodulos: RolesPermisosAccion[] = [];
  submodulosFiltrados: RolesPermisosAccion[] = [];
  roles: ComboResponse[] = [];
  modulos: Modulo[] = []
  usuarioActual: Usuario | null;
 
  // roles: { idRol: number; nombre: string }[] = [];
  // modulos: { idModulo: number; nombre: string }[] = [];

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private moduloService: ModuloService,
    private toastr: ToastrService,
  ) {
     this.usuarioActual = this.authService.usuarioActual;
   }



  ngOnInit(): void {
    this.instanciarFormulario();
    this.cargarComboRoles();
    this.cargarModulos();
  }

  //  const usuarioActual = this.authService.usuarioActual;

  //   private cargarRoles() {
  //   this.roles = [
  //     { idRol: 1, nombre: 'Administrador' },
  //     { idRol: 2, nombre: 'Usuario' },
  //   ];
  // }

  // private cargarModulos() {
  //   this.modulos = [
  //     { idModulo: 1, nombre: 'Seguridad' },
  //     { idModulo: 2, nombre: 'Inventario' },
  //   ];
  // }

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



  private cargarModulos(): void {
    this.moduloService.obtenerListadoModulos().subscribe({
      next: (res) => this.modulos = res,
      error: () => this.toastr.error('Error al cargar módulos')
    });
  }



  onRolChange(): void {
    this.f['idModulo']?.setValue('-999'); // 👉 valor predeterminado
    this.cargarPermisosRolesAcciones(); // Mostrar todos los submódulos
  }


guardarPermisos(): void {
  if (this.asignacionPermisosForm.invalid) {
    this.toastr.warning('Debe seleccionar un rol para asignar permisos');
    return;
  }

  const idRol = +this.f['idRol'].value;

  const permisosAEnviar = this.todosLosSubmodulos.map(p => ({
    idRol: idRol,
    idSubModulo: p.idSubModulo,
    leer: p.leer ?? 0,
    crear: p.crear ?? 0,
    editar: p.editar ?? 0,
    eliminar: p.eliminar ?? 0,
    idUsuarioCreacion: this.usuarioActual?.idUsuario ?? 0
  }));

  const permisosFiltrados = permisosAEnviar.filter(p =>
  p.leer !== 0 || p.crear !== 0 || p.editar !== 0 || p.eliminar !== 0
);

  console.log('Permisos enviados:', permisosFiltrados);

  this.authService.guardarPermisosRolesAcciones(permisosFiltrados).subscribe({
    next: () => this.toastr.success('Permisos enviados correctamente'),
    error: () => this.toastr.error('Error al enviar permisos')
  });
}




cargarPermisosRolesAcciones(): void {
  const idRol = this.f['idRol'].value;

  if (!idRol || idRol === '') {
    this.toastr.warning('Seleccione un rol antes de continuar');
    return;
  }

  this.authService.obtenerPermisosRolesAcciones(idRol).subscribe({
    next: (res) => {
      console.log('Submódulos cargados:', res);
      this.todosLosSubmodulos = res;
      this.filtrarSubmodulosPorModulo(); // Aplica filtro si ya hay módulo seleccionado
    },
    error: () => this.toastr.error('No se pudieron cargar los submódulos')
  });
}

  // }

// cargarTodosLosSubmodulos(): void {
//   this.moduloService.obtenerListadoSubmodulosDto().subscribe({
//     next: (res) => {
//       console.log('Submódulos cargados:', res);
//       this.todosLosSubmodulos = res;
//       this.filtrarSubmodulosPorModulo(); // <- Aplica filtro inmediatamente si ya hay un módulo seleccionado
//     },
//     error: () => this.toastr.error('No se pudieron cargar los submódulos')
//   });
// }


filtrarSubmodulosPorModulo(): void {
  const idModulo = +this.asignacionPermisosForm.get('idModulo')?.value;
  console.log("Id seleccionado:", idModulo);

  if (idModulo === -999) {
    // Mostrar todos
    this.submodulosFiltrados = [...this.todosLosSubmodulos];
  } else {
    // Filtrar submódulos que coincidan
    const filtrados = this.todosLosSubmodulos.filter(s => +(s.idModulo ?? 0) === idModulo);
    console.log("Filtrados:", filtrados);

    // Si no hay coincidencias, limpiar tabla (quedará vacía)
    this.submodulosFiltrados = filtrados;
  }

  // Mostrar longitud para depuración
  console.log("Submódulos visibles:", this.submodulosFiltrados.length);
}


  // cargarTodosLosSubmodulos(): void {
  //   const idModulo = this.asignacionPermisosForm.get('idModulo')?.value;

  //   if (idModulo === '-999') {
  //     // Mostrar todos los submódulos
  //     this.submodulosFiltrados = [...this.todosLosSubmodulos];
  //   } else {
  //     // Filtrar los submódulos por módulo
  //     this.submodulosFiltrados = this.todosLosSubmodulos.filter(s => s.idModulo == idModulo);
  //   }
  // }

//   private obtenerTodosLosSubmodulos(idRol: number): void {
//   this.moduloService.obtenerSubmodulosPorRol(idRol).subscribe({
//     next: (data) => {
//       this.todosLosSubmodulos = data;
//       this.cargarSubmodulos(); // Mostrar todos o aplicar filtro inicial
//     },
//     error: () => {
//       this.toastr.error('Error al cargar submódulos');
//     }
//   });
// }

  private instanciarFormulario(): void {
    this.asignacionPermisosForm = this.fb.group({
      idRol: ['', Validators.required],
      idModulo: [Validators.required],
      permisos: this.fb.array([]) // Cada elemento será un submódulo con acciones
    });
  }

  get f() {
    return this.asignacionPermisosForm.controls;
  }

}
