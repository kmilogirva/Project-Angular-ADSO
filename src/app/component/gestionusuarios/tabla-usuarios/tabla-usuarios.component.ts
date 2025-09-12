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
// import { Usuario } from 'src/app/shared/models/Usuario';
import { UsuarioResponse } from 'src/app/models/Response/Seguridad/UsuarioResponse';

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
  @Input() usuarios: UsuarioResponse[] = [];

  @Output() editarUsuario   = new EventEmitter<UsuarioResponse>();
  @Output() eliminarUsuario = new EventEmitter<UsuarioResponse>();

  editar(u: UsuarioResponse) {
    this.editarUsuario.emit(u);
    }
    eliminar(usu: UsuarioResponse) { this.eliminarUsuario.emit(usu); }

  displayedColumns = [
    'posicion',
    'nombreCompleto',
    'correo',
    'telefono',
    'idRol',
    'idEstado',
    'acciones'
  ];

  dataSource = new MatTableDataSource<UsuarioResponse>();

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
    const textoBusqueda = `${usuario.nombreCompleto} ${usuario.email ?? ''} ${usuario.telefono ?? ''} ${usuario.nombreRol || 'Sin Rol'}`;
    return textoBusqueda.toLowerCase().includes(filtro);
  };

  this.dataSource.filter = this.termino.trim().toLowerCase();
}

}
