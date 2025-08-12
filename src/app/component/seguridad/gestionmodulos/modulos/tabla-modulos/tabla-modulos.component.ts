// src/app/modulos/tabla-modulos.component.ts
import {
  Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Modulo } from 'src/app/models/modulos/Modulo';

@Component({
  selector: 'app-tabla-modulos',
  templateUrl: './tabla-modulos.component.html',
  styleUrls: ['./tabla-modulos.component.scss'],
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
export class TablaModulosComponent implements AfterViewInit, OnChanges {
  @Input() modulos: Modulo[] = [];

  @Output() editarModulo = new EventEmitter<Modulo>();
  @Output() eliminarModulo = new EventEmitter<Modulo>();

  displayedColumns = ['id', 'nombre', 'descripcion', 'idEstado','iconModulo', 'acciones'];
  dataSource = new MatTableDataSource<Modulo>();

  termino = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modulos']) {
      this.dataSource.data = this.modulos;
      this.aplicarFiltro();
    }
  }

  aplicarFiltro() {
    this.dataSource.filterPredicate = (mod, filter) => {
      const texto = (mod.nombre + mod.descripcion).toLowerCase();
      return texto.includes(filter);
    };
    this.dataSource.filter = this.termino.trim().toLowerCase();
  }

  editar(mod: Modulo) {
    this.editarModulo.emit(mod);
  }

  eliminar(mod: Modulo) {
    this.eliminarModulo.emit(mod);
  }
}
