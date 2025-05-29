import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SidebarComponent]
})
export class ModulosComponent implements OnInit, OnDestroy {

  moduloForm!: FormGroup;
  submoduloForm!: FormGroup;

  modulos: {
    id: string;
    nombre: string;
    descripcion: string;
    estado: string;
    submodulos?: { nombre: string; descripcion: string; estado: string }[];
  }[] = [];

  editIndex: number | null = null;
  mostrarSubformIndex: number | null = null;
  subEditIndex: number | null = null;
  subParentIndex: number | null = null;

  modulosExpandido: Set<number> = new Set(); // 👈 Para manejar expansión/cierre por módulo

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.moduloForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: [''],
      estado: ['', Validators.required]
    });

    this.submoduloForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      estado: ['', Validators.required]
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
          first: 'Primero', last: 'Último', next: 'Siguiente', previous: 'Anterior'
        }
      }
    };
  }

  get f() { return this.moduloForm.controls; }

  onSubmit(): void {
    if (this.moduloForm.valid) {
      const nuevoModulo = { ...this.moduloForm.value };

      if (this.editIndex !== null) {
        this.modulos[this.editIndex] = nuevoModulo;
        this.editIndex = null;
      } else {
        nuevoModulo.id = crypto.randomUUID();
        this.modulos.push(nuevoModulo);
      }

      this.moduloForm.reset();
    } else {
      this.moduloForm.markAllAsTouched();
    }
  }

  editarModulo(index: number): void {
    const modulo = this.modulos[index];
    this.moduloForm.setValue(modulo);
    this.editIndex = index;
  }

  eliminarModulo(index: number): void {
    this.modulos.splice(index, 1);
    this.modulosExpandido.delete(index); // cerrar si se elimina
  }

  toggleSubform(index: number): void {
    if (this.mostrarSubformIndex === index && this.subEditIndex === null) {
      this.mostrarSubformIndex = null;
      this.submoduloForm.reset();
      return;
    }

    this.mostrarSubformIndex = index;
    this.subEditIndex = null;
    this.subParentIndex = null;
    this.submoduloForm.reset();
  }

  guardarSubmodulo(index: number): void {
    if (this.submoduloForm.valid) {
      const submodulo = this.submoduloForm.value;

      if (!this.modulos[index].submodulos) {
        this.modulos[index].submodulos = [];
      }

      if (this.subEditIndex !== null && this.subParentIndex === index) {
        this.modulos[index].submodulos![this.subEditIndex] = submodulo;
      } else {
        this.modulos[index].submodulos!.push(submodulo);
      }

      this.submoduloForm.reset();
      this.subEditIndex = null;
      this.subParentIndex = null;
      this.mostrarSubformIndex = null;
    } else {
      this.submoduloForm.markAllAsTouched();
    }
  }

  editarSubmodulo(parentIndex: number, subIndex: number): void {
    const sub = this.modulos[parentIndex].submodulos![subIndex];
    this.submoduloForm.setValue(sub);
    this.mostrarSubformIndex = parentIndex;
    this.subEditIndex = subIndex;
    this.subParentIndex = parentIndex;
  }

  eliminarSubmodulo(parentIndex: number, subIndex: number): void {
    this.modulos[parentIndex].submodulos!.splice(subIndex, 1);
    if (this.modulos[parentIndex].submodulos?.length === 0) {
      this.modulosExpandido.delete(parentIndex);
    }
  }

  toggleExpand(index: number): void {
    if (this.modulosExpandido.has(index)) {
      this.modulosExpandido.delete(index);
    } else {
      this.modulosExpandido.add(index);
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
