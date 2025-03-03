import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import {  } from 'angular-datatables';
import { ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Producto} from 'src/app/models/productos/Producto'


import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
// import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule, SidebarComponent ,NavbarComponent,DataTablesModule]
})
export class ProductosComponent implements OnInit {
productoForm!: FormGroup; 
codReferencia : string = '';
nombreProducto: string[] = [];
categoria : string[] = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar'];
cantidad : number[] = [];
ubicacion : string ='';
precio : number[] = []

// items: any[] = [];
// dtTrigger: Subject<any> = new Subject();
// @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
// dtOptions: DataTables.Settings = {};
lenguajeEspanol: any = environment
// toggle = false;
 selectedCount: number = 0;

productos: Producto[] = [
  { codReferencia: 'P001', nombreProducto: 'Laptop', categoria: 'Electrónica', cantidad: 10, precio: 1200 },
  { codReferencia: 'P002', nombreProducto: 'Mouse', categoria: 'Accesorios', cantidad: 50, precio: 25 },
  { codReferencia: 'P003', nombreProducto: 'Teclado', categoria: 'Accesorios', cantidad: 30, precio: 45 }
];

@ViewChild(DataTableDirective, { static: false }) 
 dtElement!: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

constructor(private fb: FormBuilder) {}

ngOnInit(): void {
  this.instanciarFormulario();
  this.inicializarDataTable();
}


ngAfterViewInit(): void {
  this.dtTrigger.next(null);
}

instanciarFormulario(): void{
  this.productoForm = this.fb.group({
    codReferencia: ['', Validators.required],
    nombreProducto: ['', Validators.required],
    categoria: ['', Validators.required],
    cantidad: ['', [Validators.required, Validators.min(1)]],
    ubicacion: ['', Validators.required],
    precio: ['', [Validators.required, Validators.min(0.01)]]
  
});
}

get f() {
  return this.productoForm.controls;
}

// inicializarDataTable(): void {
//   this.dtOptions = {
//     pagingType: 'full_numbers',
//     pageLength: 5,
//     responsive: true,
//     language: {
//       search: 'Buscar:',
//       lengthMenu: 'Mostrar _MENU_ registros por página',
//       info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
//       paginate: {
//         first: 'Primero',
//         last: 'Último',
//         next: 'Siguiente',
//         previous: 'Anterior'
//       }
//     }
//   };
//   this.dtTrigger.next(null);
// }

inicializarDataTable(): void {
this.dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 20,
  lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Todos"]],
  ordering: true,
  searching: true, 
  info: true, 
  destroy: true,
  columnDefs: [
    { orderable: false, targets: 0 },
    { orderable: false, targets: 1 },
    { visible: true, targets: 2 },
    { visible: true, targets: 3 },
    { visible: true, targets: 4 },
    { visible: true, targets: 5 }
  ],
  language: this.lenguajeEspanol
};

this.dtTrigger.next(this.dtOptions);
}

// rerender(): void {
//   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
//     dtInstance.destroy();
//     this.dtTrigger.next(null);
//   });
// }

// reload(): void {
//   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
//     dtInstance.ajax.reload();
//   });
// }

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}



// toggleAll() {
//   this.toggle = !this.toggle;
//   this.items.forEach((item) => (item.seleccionado = this.toggle));
//   if (this.toggle) {
//     this.selectedCount = this.items.length;
//   } else {
//     this.selectedCount = 0;
//   }
// }

// toggleItem(item: Producto) {
//   item.seleccionado = !item.seleccionado;
//   console.log("Selección item", item)
// }


toggleItem(item: Producto): void {
  item.seleccionado = !item.seleccionado;
  if (item.seleccionado) {
    this.selectedCount++;
    console.log("Selección item", item)
  } else {
    this.selectedCount--;
    console.log("Deselección item", item)
}
}

  onSubmit() {
    if (this.productoForm.valid) {
      const newProduct = this.productoForm.value;
      console.log('Producto agregado:', newProduct);
      // Aquí puedes enviar el producto a un servicio o API para agregarlo al inventario
    }
  }
}
