import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-stock',
  standalone: true,
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarComponent
  ]
})
export class StockComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  productos: any[] = [
    { codReferencia: 'P001', nombreProducto: 'Laptop', categoria: 'Electrónica', cantidad: 5, minimoStock: 10, precio: 1200 },
    { codReferencia: 'P002', nombreProducto: 'Mouse', categoria: 'Accesorios', cantidad: 20, minimoStock: 10, precio: 25 },
    { codReferencia: 'P003', nombreProducto: 'Teclado', categoria: 'Accesorios', cantidad: 8, minimoStock: 10, precio: 45 }
  ];

  get productosConAlerta(): any[] {
    return this.productos.filter(p => p.cantidad < p.minimoStock);
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      destroy: true,
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros por página',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior'
        }
      }
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
