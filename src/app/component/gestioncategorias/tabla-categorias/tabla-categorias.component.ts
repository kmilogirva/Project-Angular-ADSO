import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorIntl } from '@angular/material/paginator';

interface CategoriaNormalized {
  id: number;
  nombre: string;
  descripcion?: string;
  estado?: boolean | null;
  __original?: any;
}

@Component({
  selector: 'app-tabla-categorias',
  templateUrl: './tabla-categorias.component.html',
  styleUrls: ['./tabla-categorias.component.scss'],
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
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: new MatPaginatorIntl() }]
})
export class TablaCategoriasComponent implements AfterViewInit, OnChanges {
  @Input() categorias: any[] = [];
  @Output() editarCategoria = new EventEmitter<any>();
  @Output() eliminarCategoria = new EventEmitter<number>();

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<CategoriaNormalized>();

  termino = '';
  searchValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categorias']) {
      const normalized = (this.categorias ?? []).map((c, i) => this.normalizeCategoria(c, i));
      this.dataSource.data = normalized;
      this.aplicarFiltro();
    }
  }

  private normalizeCategoria(c: any, index: number): CategoriaNormalized {
    return {
      id: c.idCategoria ?? index,
      nombre: c.nomCategoria ?? '',
      descripcion: c.descripcion ?? '',
      estado: c.estado ?? true,
      __original: c
    };
  }

  applyFilter(event: Event | null): void {
    if (event instanceof Event) {
      const input = event.target as HTMLInputElement;
      this.searchValue = input.value ?? '';
      this.termino = this.searchValue;
    }
    this.aplicarFiltro();
  }

  clearFilter(): void {
    this.searchValue = '';
    this.termino = '';
    this.aplicarFiltro();
  }

  abrirDialogoEditar(categoriaRow: CategoriaNormalized): void {
    this.editarCategoria.emit(categoriaRow.__original ?? categoriaRow);
  }

  eliminarCategoriaPorId(id: number): void {
    this.eliminarCategoria.emit(id);
  }

  private aplicarFiltro(): void {
    this.dataSource.filterPredicate = (row: CategoriaNormalized, filter: string) => {
      const texto = `${row.nombre ?? ''} ${row.descripcion ?? ''} ${(row.estado ? 'activo' : 'inactivo')}`;
      return texto.toLowerCase().includes(filter.toLowerCase());
    };
    this.dataSource.filter = (this.termino ?? '').trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
