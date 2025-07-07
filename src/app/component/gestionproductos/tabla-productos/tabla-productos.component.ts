// src/app/productos/tabla-productos.component.ts
import {
  Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges,Output, EventEmitter
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Producto } from 'src/app/models/productos/Producto';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.scss'],
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
export class TablaProductosComponent
       implements AfterViewInit, OnChanges {
  // Recibe la lista de productos que llena tu formulario

  @Output() editarProducto  = new EventEmitter<Producto>();
  @Output() eliminarProducto = new EventEmitter<Producto>();

  editar(p: Producto) {
  this.editarProducto.emit(p);
  }
  eliminar(prod: Producto) { this.eliminarProducto.emit(prod); }

  @Input() productos: Producto[] = [];

  displayedColumns = [
    'IdProducto',
    'NomProducto',
    'CodEan',
    'IdCategoria',
    'UbicacionProducto',
    'Cantidad',
    'Observacion',
    'acciones'
  ];

  dataSource = new MatTableDataSource<Producto>();

  // Filtros
  termino = '';
  minCant: number | null = null;
  maxCant: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productos']) {
      this.dataSource.data = this.productos;
      this.aplicarFiltro();
    }
  }

  /** Vuelve a evaluar el filtro personalizado */
  aplicarFiltro() {
    this.dataSource.filterPredicate = (prod, filter) => {
      const textoOk = (
        prod.nomProducto + prod.codEan + prod.idCategoria+ prod.ubicacionProducto
      ).toLowerCase().includes(filter);

      const minOk = this.minCant == null || prod.cantidad >= this.minCant;
      const maxOk = this.maxCant == null || prod.cantidad <= this.maxCant;

      return textoOk && minOk && maxOk;
    };

    // ⚠️ Disparador: cambiar filter obliga a recalcular
    this.dataSource.filter = this.termino.trim().toLowerCase();
  }

  /** Acción ejemplo: borrar (emite id al padre, etc.) */
  // eliminar(prod: Producto) {
  //   // Aquí emites un Output o llamas a un servicio…
  //   console.log('Eliminar', prod.idProducto);
  // }

  // editar(prod: Producto) {
  //   // Podrías emitir el producto al padre para
  //   // precargar el formulario y editar.
  //   console.log('Editar', prod.idProducto);
  // }
}
