import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SidebarComponent
  ]
})
export class PermisosComponent implements OnInit, OnDestroy {
  permisoForm!: FormGroup;

  roles: string[] = ['Administrador', 'Gestor', 'Usuario'];
  permisosDisponibles: string[] = [
    'Ver productos',
    'Editar productos',
    'Eliminar productos',
    'Exportar datos',
    'Asignar permisos'
  ];
  permisosAsignados: { rol: string; permisos: string[] }[] = [];

  mostrarPermisos: boolean = false;
  permisoSeleccionado: string = '';
  permisosSeleccionados: string[] = [];

  editIndex: number | null = null;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.permisoForm = this.fb.group({
      rol: ['', Validators.required],
      permisos: [[], Validators.required]
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      destroy: true,
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros por página',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior'
        }
      }
    };
  }

  get f() {
    return this.permisoForm.controls;
  }

  onRolChange() {
    const rol = this.f['rol'].value;
    this.permisoSeleccionado = rol;
    this.mostrarPermisos = true;
    this.permisosSeleccionados = [];
    this.f['permisos'].setValue(this.permisosSeleccionados);
  }

  onPermisoChange(event: any) {
    const permiso = event.target.value;
    if (event.target.checked) {
      this.permisosSeleccionados.push(permiso);
    } else {
      const index = this.permisosSeleccionados.indexOf(permiso);
      if (index > -1) {
        this.permisosSeleccionados.splice(index, 1);
      }
    }
    this.f['permisos'].setValue(this.permisosSeleccionados);
  }

  onSubmit() {
    if (this.permisoForm.valid) {
      const nuevoPermiso = {
        rol: this.f['rol'].value,
        permisos: this.f['permisos'].value
      };

      if (this.editIndex !== null) {
        this.permisosAsignados[this.editIndex] = nuevoPermiso;
        this.editIndex = null;
      } else {
        this.permisosAsignados.push(nuevoPermiso);
      }

      console.log('Permisos guardados:', nuevoPermiso);
      this.permisoForm.reset();
      this.mostrarPermisos = false;
    } else {
      this.permisoForm.markAllAsTouched();
    }
  }

  editarPermiso(index: number): void {
    const permiso = this.permisosAsignados[index];
    this.f['rol'].setValue(permiso.rol);
    this.permisosSeleccionados = [...permiso.permisos];
    this.f['permisos'].setValue(this.permisosSeleccionados);
    this.mostrarPermisos = true;
    this.permisoSeleccionado = permiso.rol;
    this.editIndex = index;
  }

  eliminarPermiso(index: number): void {
    this.permisosAsignados.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}