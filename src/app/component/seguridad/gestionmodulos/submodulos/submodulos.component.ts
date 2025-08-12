import { Component, OnInit } from '@angular/core';
import { CommonModule, NumberSymbol } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TablaSubmodulosComponent } from './tabla-submodulos/tabla-submodulos.component';

import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';

// import { SubmoduloService } from 'src/app/services/Submodulos/submodulo.service';
import { ModuloService } from 'src/app/services/Modulos/modulo.service';
import { AuthService } from 'src/app/core/services/auth.service';
// import { Submodulo } from 'src/app/models/submodulos/Submodulo';
import { Modulo } from 'src/app/models/modulos/Modulo';
import { Submodulo } from 'src/app/models/modulos/Submodulo';
import { R3BoundTarget } from '@angular/compiler';

@Component({
  selector: 'app-submodulos',
  templateUrl: './submodulos.component.html',
  styleUrls: ['./submodulos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarComponent,
    TablaSubmodulosComponent
  ]
})
export class SubmodulosComponent implements OnInit {

  submoduloForm!: FormGroup;
  submodulos: Submodulo[] = [];
   modulos: Modulo[] = [];
   esEdicion : Boolean = false;

  constructor(
    private fb: FormBuilder,
    // private submoduloService: SubmoduloService,
    private moduloService: ModuloService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.instanciarFormulario();
    this.cargarDataSubmodulos();
    this.cargarModulos();
  }

  private instanciarFormulario(): void {
    this.submoduloForm = this.fb.group({
      idSubModulo: [null],
      idModulo: [null, Validators.required],
      nombre: ['', Validators.required],
      descripcion: [''],
      idEstado: [1, Validators.required],
      iconSubModulo: ['',Validators.required],
      rutaAngular: ['',Validators.required],
      idUsuarioCreacion: [null],
      idUsuarioModificacion: [null],
      fechaCreacion:[null],
      fechaModificacion:[null]
    });
  }

  get f() {
    return this.submoduloForm.controls;
  }

  // onEstadoToggle(event: Event): void {
  //   const isChecked = (event.target as HTMLInputElement).checked;
  //   const nuevoEstado = isChecked ? 1 : 0;
  //   this.submoduloForm.patchValue({ idEstado: nuevoEstado });
  // }

  onSubmit(): void {
    if (this.submoduloForm.invalid) return;

    this.esEdicion = !!this.f['idSubModulo'].value;
    // const esEdicion = !!this.f['id'].value;
    const idUsuario = this.authService.obtenerIdUsuario();

    const dto: any = {
      ...this.submoduloForm.value,
        IdUsuarioCreacion:  this.esEdicion ? this.submoduloForm.value.idUsuarioCreacion : idUsuario,
        IdUsuarioModificacion:  this.esEdicion ? idUsuario : this.submoduloForm.value.idUsuarioModificacion ?? null,
    };

     for (const key in dto) {
      const value = dto[key];
      if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
        delete dto[key];
      }
    }
     console.log("console OnSubmit",dto)

    // console.log(dto)
    // if (this.esEdicion) {
    //   delete dto.idSubModulo;
    //   delete dto.idUsuarioModificacion;
    // } else {
    //   delete dto.idUsuarioCreacion;
    // }
 
    const accion$ = this.esEdicion
      ? this.moduloService.actualizarSubmodulo(dto)
      : this.moduloService.crearSubmodulo(dto);

    accion$.subscribe({
      next: () => {
        this.toastr.success(this.esEdicion ? 'Submódulo actualizado' : 'Submódulo registrado');
        this.cargarDataSubmodulos();
        this.submoduloForm.reset();
      },
      error: () => this.toastr.error('Error al procesar la solicitud')
    });
  }

//   llenarCamposFormulario(submodulo: Submodulo) {
//     console.log('Editando:', submodulo);
  
//   if (submodulo?.id !== undefined) {
//     // Usa submodulo.idSubmodulo como lo necesitas
//     console.log('Editando:', submodulo);
//   }
// }

  llenarCamposFormulario(submodulo: Submodulo): void {
    console.log("Entre por llenarCamposFormulario", submodulo.idSubModulo)
    if (!submodulo.idModulo) {
      this.toastr.warning('ID no válido');
      return;
    }

    this.moduloService.obtenerSubModuloPorId(submodulo.idSubModulo!).subscribe({
      next: (submodulo) => {
        console.log("Data SubModulo",submodulo)
        this.submoduloForm.patchValue({
          idSubModulo: submodulo.idSubModulo,
          idModulo: submodulo.idModulo,
          nombre: submodulo.nombre,
          iconSubModulo : submodulo.iconSubModulo,
          rutaAngular : submodulo.rutaAngular,
          descripcion : submodulo.descripcion,
          idEstado: submodulo.idEstado,
          idUsuarioCreacion: submodulo.idUsuarioCreacion,
          idUsuarioModificacion: submodulo.idUsuarioModificacion,
          fechaCreacion : submodulo.fechaCreacion,
          fechaModificacion : submodulo.fechaModificacion
        });
      },
      error: () => this.toastr.error('Error al cargar submódulo')
    });
  }

   onEliminar(submodulo: Submodulo): void {
  if (!submodulo.idSubModulo) {
    console.log("Id Invalido a Eliminar");
    return;
  }

  const confirmado = confirm("¿Confirma que desea eliminar el registro?");
  if (!confirmado) {
    return;
  }

  // Eliminación local (opcional y optimista)
  this.modulos = this.modulos.filter(m => m.id !== submodulo.idSubModulo);

  this.moduloService.eliminarSubmoduloPorId(submodulo.idSubModulo).subscribe({
    next: () => {
      this.toastr.success('Módulo eliminado correctamente');
      this.cargarDataSubmodulos();
    },
    error: (err) => {
      this.toastr.error('Error al eliminar el módulo');
      console.error('Error al eliminar el módulo:', err);

      // Restaurar el módulo en caso de error
      this.modulos.push(submodulo);
    }
  });
}

  private cargarDataSubmodulos(): void {
  this.moduloService.obtenerListadoSubmodulos().subscribe({
    next: (res) => {
      console.log('Submódulos cargados:', res); // 👈 Console log para depuración
      this.submodulos = res;
    },
    error: () => this.toastr.error('No se pudieron cargar los submódulos')
  });
}

  private cargarModulos(): void {
    this.moduloService.obtenerListadoModulos().subscribe({
      next: (res) => this.modulos = res,
      error: () => this.toastr.error('Error al cargar módulos')
    });
  }
}
