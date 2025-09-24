import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
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
import { Roles } from 'src/app/shared/models/roles.model';

@Component({
  selector: 'app-tabla-roles',
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
  ],
  templateUrl: './tabla-roles.component.html',
  //styleUrls: ['./tabla-roles.component.scss'], // puedes dejar el archivo vacío o no crearlo si no lo necesitas
})
export class TablaRolesComponent implements AfterViewInit, OnChanges {
  @Input() roles: Roles[] = [];
  @Output() editarRol = new EventEmitter<Roles>();
  @Output() eliminarRol = new EventEmitter<number>();

  displayedColumns = ['id', 'nombreRol', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Roles>();
  termino: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['roles']) {
      this.dataSource.data = this.roles || [];
      this.aplicarFiltro();
    }
  }

  aplicarFiltro(): void {
    const filtro = (this.termino || '').trim().toLowerCase();
    this.dataSource.filterPredicate = (rol: Roles, f: string) => {
      const nombre = (rol.nombreRol || '').toString();
      const id = (rol.id ?? '').toString();
      const estado = rol.idEstado ? 'activo' : 'inactivo';
      const datos = `${id} ${nombre} ${estado}`;
      return datos.toLowerCase().includes(f);
    };
    this.dataSource.filter = filtro;
  }

  onEditar(rol: Roles): void {
    this.editarRol.emit(rol);
  }

  onEliminar(id: number): void {
    this.eliminarRol.emit(id);
  }
}
