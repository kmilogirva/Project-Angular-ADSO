import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';

interface Categoria {
  codigo: string;
  descripcion: string;
  estado: 'ACTIVO' | 'INACTIVO';
}

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SidebarComponent, DataTablesModule]
})
export class CategoriasComponent implements OnInit {
  categoriaForm!: FormGroup;
  categorias: Categoria[] = [];

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      descripcion: ['', Validators.required],
      estado: ['ACTIVO', Validators.required]
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
      }
    };

    this.dtTrigger.next(null);
  }

  get f() {
    return this.categoriaForm.controls;
  }

  registrarCategoria(): void {
    if (this.categoriaForm.invalid) return;

    const nuevaCategoria: Categoria = { ...this.categoriaForm.value };
    this.categorias.push(nuevaCategoria);
    this.categoriaForm.reset({ estado: 'ACTIVO' });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}