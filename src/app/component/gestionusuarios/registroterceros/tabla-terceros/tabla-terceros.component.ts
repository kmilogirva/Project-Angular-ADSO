import {
  Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tercero } from 'src/app/models/terceros/Tercero';

@Component({
  selector: 'app-tabla-terceros',
  templateUrl: './tabla-terceros.component.html',
  styleUrls: ['./tabla-terceros.component.scss'],
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
export class TablaTercerosComponent implements AfterViewInit, OnChanges {
  @Input() terceros: Tercero[] = [];

  @Output() editarTercero   = new EventEmitter<Tercero>();
  @Output() eliminarTercero = new EventEmitter<Tercero>();

  editar(t: Tercero) { this.editarTercero.emit(t); }
  eliminar(t: Tercero) { this.eliminarTercero.emit(t); }

  displayedColumns = [
    'posicion',
    'codTercero',
    'nombreCompleto',
    'correo',
    'idEstado',
    'telefono',
    'acciones'
  ];

  dataSource = new MatTableDataSource<Tercero>();

  termino = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['terceros']) {
      this.dataSource.data = this.terceros;
      this.aplicarFiltro();
    }
  }

  aplicarFiltro() {
    this.dataSource.filterPredicate = (tercero, filtro) => {
      const nombreCompleto = [tercero.nombre1, tercero.nombre2, tercero.apellido1, tercero.apellido2]
        .filter(nombre => nombre && nombre.trim() !== '')
        .join(' ');
      const datosBusqueda = `${tercero.codDocumento} ${nombreCompleto} ${tercero.email} ${tercero.telefono}`;
      return datosBusqueda.toLowerCase().includes(filtro);
    };

    this.dataSource.filter = this.termino.trim().toLowerCase();
  }
}
