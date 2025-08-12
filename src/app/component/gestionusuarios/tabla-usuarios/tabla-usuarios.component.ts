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
import { Usuario } from 'src/app/shared/models/Usuario';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss'],
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
export class TablaUsuariosComponent implements AfterViewInit, OnChanges {
  @Input() usuarios: Usuario[] = [];

  @Output() editarUsuario   = new EventEmitter<Usuario>();
  @Output() eliminarUsuario = new EventEmitter<Usuario>();

  editar(u: Usuario) {
    this.editarUsuario.emit(u);
    }
    eliminar(usu: Usuario) { this.eliminarUsuario.emit(usu); }

  displayedColumns = [
    'posicion',
    'nombreCompleto',
    'correo',
    'telefono',
    'idRol',
    'idEstado',
    'acciones'
  ];

  dataSource = new MatTableDataSource<Usuario>();

  termino = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuarios']) {
      this.dataSource.data = this.usuarios;
      this.aplicarFiltro();
    }
  }

  aplicarFiltro() {
    this.dataSource.filterPredicate = (usuario, filtro) => {
      const nombreCompleto = [usuario.nombre1, usuario.nombre2, usuario.apellido1, usuario.apellido2]
  .filter(nombre => nombre && nombre.trim() !== '')
  .join(' ');
      const correoTelRol = `${usuario.correo} ${usuario.telefono} ${usuario.idRol}`;
      return (
        (nombreCompleto + correoTelRol).toLowerCase().includes(filtro)
      );
    };

    this.dataSource.filter = this.termino.trim().toLowerCase();
  }

  // editar(usuario: Usuario) {
  //   this.editarUsuario.emit(usuario);
  // }

  // eliminar(usuario: Usuario) {
  //   this.eliminarUsuario.emit(usuario);
  // }
}
