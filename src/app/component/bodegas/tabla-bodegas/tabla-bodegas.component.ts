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
import { Bodega } from 'src/app/services/Bodegas/bodegas.service';

@Component({
  selector: 'app-tabla-bodegas',
  standalone: true,
  templateUrl: './tabla-bodegas.component.html',
  
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
export class TablaBodegasComponent implements AfterViewInit, OnChanges {
  @Input() bodegas: Bodega[] = [];

  @Output() editarBodega   = new EventEmitter<Bodega>();
  @Output() eliminarBodega = new EventEmitter<number>();

  displayedColumns = [
    'posicion',
    'nombreBodega',
    'ubicacion',
    'cantidadMaxima',
    'idEstado',
    'acciones'
  ];

  dataSource = new MatTableDataSource<Bodega>();
  termino = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bodegas']) {
      this.dataSource.data = this.bodegas;
      this.aplicarFiltro();
    }
  }

  aplicarFiltro() {
    this.dataSource.filterPredicate = (bodega, filtro) => {
      const datos = `${bodega.nombreBodega} ${bodega.ubicacion} ${bodega.cantidadMaxima} ${bodega.idEstado ? 'activa' : 'inactiva'}`;
      return datos.toLowerCase().includes(filtro);
    };
    this.dataSource.filter = this.termino.trim().toLowerCase();
  }

  editar(bodega: Bodega) {
    this.editarBodega.emit(bodega);
  }

  eliminar(id: number) {
    this.eliminarBodega.emit(id);
  }
}
