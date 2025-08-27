import {
  Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Cliente } from 'src/app/models/terceros/Tercero';

@Component({
  selector: 'app-tabla-clientes',
  templateUrl: './tabla-clientes.component.html',
  styleUrls: ['./tabla-clientes.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class TablaClientesComponent implements AfterViewInit, OnChanges {
  @Input() clientes: Cliente[] = [];

  @Output() editarCliente   = new EventEmitter<Cliente>();
  @Output() eliminarCliente = new EventEmitter<Cliente>();

  displayedColumns = [
    'posicion',
    'nombreCompleto',
    'correo',
    'telefono',
    'direccion',
    'idEstado',
    'acciones'
  ];

  dataSource = new MatTableDataSource<Cliente>();
  termino = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientes']) {
      this.dataSource.data = this.clientes;
      this.aplicarFiltro();
    }
  }

  aplicarFiltro() {
    this.dataSource.filterPredicate = (cliente, filtro) => {
      const texto = `${cliente.nombre} ${cliente.apellido} ${cliente.correo} ${cliente.telefono} ${cliente.direccion}`.toLowerCase();
      return texto.includes(filtro);
    };
    this.dataSource.filter = this.termino.trim().toLowerCase();
  }

  editar(cliente: Cliente) {
    this.editarCliente.emit(cliente);
  }

  eliminar(cliente: Cliente) {
    this.eliminarCliente.emit(cliente);
  }
}
