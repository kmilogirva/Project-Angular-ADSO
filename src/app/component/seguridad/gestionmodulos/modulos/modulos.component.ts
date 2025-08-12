import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { TablaModulosComponent } from './tabla-modulos/tabla-modulos.component';

import { Modulo } from 'src/app/models/modulos/Modulo';
import { ModuloService } from 'src/app/services/Modulos/modulo.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarComponent,
    TablaModulosComponent
  ]
})
export class ModulosComponent implements OnInit {

  moduloForm!: FormGroup;
  modulos: Modulo[] = [];
  esEdicion : boolean = false;

  constructor(
    private fb: FormBuilder,
    private moduloService: ModuloService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.instanciarFormulario();
    this.cargarDataModulos();
  }

  /* ────────────── Formulario reactivo ────────────── */
  private instanciarFormulario(): void {
    this.moduloForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: [''],
      idEstado: [1,Validators.required],
      iconModulo: ['',Validators.required],
      idUsuarioCreacion: [''],
      idUsuarioModificacion: [],
      fechaCreacion:[''],
      fechaModificacion:['']
    });
  }

  // onEstadoToggle(event: Event): void {
  //   const isChecked = (event.target as HTMLInputElement).checked;
  //   const nuevoEstado = isChecked ? 1 : 0;
  //   this.moduloForm.patchValue({ idEstado: nuevoEstado });
  // }

  get f() {
    return this.moduloForm.controls;
  }

  /* ────────────── Crear o editar módulo ────────────── */
  onSubmit(): void {
    if (this.moduloForm.invalid) return;

    this.esEdicion = !!this.f['id'].value;
    console.log(this.esEdicion)
    const idUsuario = this.authService.obtenerIdUsuario();

 
    let dto: any = {
  ...this.moduloForm.value,
        IdUsuarioCreacion:  this.esEdicion ? this.moduloForm.value.idUsuarioCreacion : idUsuario,
        IdUsuarioModificacion:  this.esEdicion ? idUsuario : this.moduloForm.value.idUsuarioModificacion,
      };

    // Filtrar valores nulos, undefined o strings vacíos
    for (const key in dto) {
      const value = dto[key];
      if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
        delete dto[key];
      }
    }

    

    const accion$ =  this.esEdicion
      ? this.moduloService.actualizarModulo(dto)
      : this.moduloService.registrarModulo(dto);

    accion$.subscribe({
      next: () => {
        this.toastr.success( this.esEdicion ? 'Módulo actualizado' : 'Módulo registrado');
        this.cargarDataModulos();
         this.esEdicion = false;
        this.moduloForm.reset();
        
      },
      error: () => this.toastr.error('Error al procesar la solicitud')
    });
  }

  /* ────────────── Obtener módulos existentes ────────────── */
  private cargarDataModulos(): void {
    this.moduloService.obtenerListadoModulos().subscribe({
      next: (res) => {
        this.modulos = res;
        console.log("Módulos cargados:", res);
      },
      error: () => this.toastr.error('No se pudieron cargar los módulos')
    });
  }

  /* ────────────── Llenar formulario para editar ────────────── */
  llenarCamposFormulario(id: number): void {
    if (!id) {
      this.toastr.warning('ID no válido');
      return;
    }

    this.moduloService.obtenerModuloPorId(id).subscribe({
      next: (modulo) => {
        this.esEdicion= true
        console.log("Esto e slo que recibo en llenarCamposFormulario",modulo)
        this.moduloForm.patchValue({
          id: modulo.id,
          nombre: modulo.nombre,
          iconModulo: modulo.iconModulo,
          descripcion: modulo.descripcion,
          idEstado: modulo.idEstado ?? 1,
          fechaCreacion: modulo.fechaCreacion,
          fechaModificacion: modulo.fechaModificacion,
          idUsuarioCreacion: modulo.idUsuarioCreacion,
          idUsuarioModificacion: modulo.idUsuarioModificacion
        });
      },
      error: () => this.toastr.error('Error al cargar módulo')
    });
  }

  /* ────────────── Eliminar módulo (vista) ────────────── */
 onEliminar(modulo: Modulo): void {
  if (!modulo.id) {
    console.log("Id Invalido a Eliminar");
    return;
  }

  const confirmado = confirm("¿Confirma que desea eliminar el registro?");
  if (!confirmado) {
    return;
  }

  // Eliminación local (opcional y optimista)
  this.modulos = this.modulos.filter(m => m.id !== modulo.id);

  this.moduloService.eliminarModuloPorId(modulo.id).subscribe({
    next: () => {
      this.toastr.success('Módulo eliminado correctamente');
      this.cargarDataModulos();
    },
    error: (err) => {
      this.toastr.error('Error al eliminar el módulo');
      console.error('Error al eliminar el módulo:', err);

      // Restaurar el módulo en caso de error
      this.modulos.push(modulo);
    }
  });
}

}
