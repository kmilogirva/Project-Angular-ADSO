// src/app/component/submodulos/tabla-submodulos.component.ts
import {
  Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Submodulo } from 'src/app/models/modulos/Submodulo';

@Component({
  selector: 'app-tabla-submodulos',
  templateUrl: './tabla-submodulos.component.html',
  styleUrls: ['./tabla-submodulos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class TablaSubmodulosComponent implements AfterViewInit, OnChanges {
  @Input() submodulos: Submodulo[] = [];

  @Output() editarSubmodulo = new EventEmitter<Submodulo>();
  @Output() eliminarSubmodulo = new EventEmitter<Submodulo>();

  displayedColumns = ['id', 'nombre', 'descripcion', 'idEstado', 'acciones'];
  dataSource = new MatTableDataSource<Submodulo>();

  termino = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['submodulos']) {
      this.dataSource.data = this.submodulos;
      this.aplicarFiltro();
    }
  }

  aplicarFiltro() {
    this.dataSource.filterPredicate = (sub, filter) => {
      const texto = (sub.nombre ?? '') + (sub.descripcion ?? '');
      return texto.toLowerCase().includes(filter);
    };
    this.dataSource.filter = this.termino.trim().toLowerCase();
  }

  editar(sub: Submodulo) {
    this.editarSubmodulo.emit(sub);
  }

  eliminar(sub: Submodulo) {
    this.eliminarSubmodulo.emit(sub);
  }
}
