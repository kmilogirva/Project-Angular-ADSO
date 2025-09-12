import {
  Component, Input, ViewChild, AfterViewInit, OnChanges,
  SimpleChanges, Output, EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Movimiento } from 'src/app/models/movimientos/Movimiento';

// Modelo
export interface EntradaSalida {
  idMovimiento: number;
  tipoMovimiento: string;   // Entrada | Salida
  producto: string;
  cantidad: number;
  fechaMovimiento: Date;
  observacion?: string;
}

@Component({
  selector: 'app-tabla-entradas-salidas',
  templateUrl: './tabla-entradasysalidas.component.html',
  styleUrls: ['./tabla-entradasysalidas.component.scss'],
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
export class TablaEntradasSalidasComponent implements AfterViewInit, OnChanges {

  @Input() movimientos: Movimiento[] = [];
  @Output() editarMovimiento = new EventEmitter<EntradaSalida>();
  @Output() eliminarMovimiento = new EventEmitter<EntradaSalida>();

  displayedColumns = [
    'idMovimiento',
    'tipoMovimiento',
    'producto',
    'cantidad',
    'fechaMovimiento',
    'observacion',
    'acciones'
  ];

  dataSource = new MatTableDataSource<EntradaSalida>();

  // Filtros
  termino = '';
  minCant: number | null = null;
  maxCant: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movimientos']) {
      //this.dataSource.data = this.movimientos;
      this.aplicarFiltro();
    }
  }

  editar(m: EntradaSalida) { this.editarMovimiento.emit(m); }
  eliminar(m: EntradaSalida) { this.eliminarMovimiento.emit(m); }

  aplicarFiltro() {
    this.dataSource.filterPredicate = (mov, filter) => {
      const textoOk = (
        mov.producto + mov.tipoMovimiento + (mov.observacion || '')
      ).toLowerCase().includes(filter);

      const minOk = this.minCant == null || mov.cantidad >= this.minCant;
      const maxOk = this.maxCant == null || mov.cantidad <= this.maxCant;

      return textoOk && minOk && maxOk;
    };

    this.dataSource.filter = this.termino.trim().toLowerCase();
  }
}
