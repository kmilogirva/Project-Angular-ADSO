import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { } from 'angular-datatables';
import { ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/models/productos/Producto'
import JsBarcode from 'jsbarcode';
import { ProductoService } from 'src/app/services/Productos/productos.service';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { AuthService } from 'src/app/core/services/auth.service';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SidebarComponent, DataTablesModule]
})
export class ProductosComponent implements OnInit {
  productoForm!: FormGroup;
  IdCategoria: number[] = [1, 2, 3, 4];
  CodEanVisible: boolean = false
 

  // items: any[] = [];
  // dtTrigger: Subject<any> = new Subject();
  // @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  lenguajeEspanol: any = environment
  // toggle = false;
  selectedCount: number = 0;

  productos: Producto[] =
    [
      // { IdProducto: 1, NomProducto: 'Laptop', IdCategoria: 'Electrónica', Cantidad: 10, precio: 1200 },
      // { IdProducto: 2, 'P002', NomProducto: 'Mouse', IdCategoria: 'Accesorios', Cantidad: 50, precio: 25 },
      // { codReferencia: 'P003', NomProducto: 'Teclado', IdCategoria: 'Accesorios', Cantidad: 30, precio: 45 }
    ];

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder,
    private productosService: ProductoService,
     private toastr: ToastrService,
     private authService : AuthService
  ) { }

  ngOnInit(): void {
    // const IdUsuario = this.authService.obtenerIdUsuario();
    // console.log("Este es el IdUsuario", IdUsuario)
    //   if (IdUsuario) {
    //     this.productoForm.patchValue({ IdUsuarioCrea: IdUsuario });
    //   }
    this.instanciarFormulario();
    this.inicializarDataTable();
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  instanciarFormulario(): void {
    this.productoForm = this.fb.group({
      IdProducto: [''],
      CodEan: [''],
      NomProducto: ['', Validators.required],
      IdCategoria: ['', Validators.required],
      UbicacionProducto: ['', Validators.required],
      Cantidad: ['', [Validators.required, Validators.min(1)]],
      Observacion: [''],
      IdUsuarioCreacion: ['']
    });
  }

  get f() {
    return this.productoForm.controls;
  }

  generateEAN13(): string {
    const base = Math.floor(100000000000 + Math.random() * 900000000000).toString().substring(0, 12); // 12 dígitos aleatorios
    let sum = 0;
    for (let i = 0; i < base.length; i++) {
      const digit = parseInt(base[i], 10);
      sum += i % 2 === 0 ? digit : digit * 3;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    return base + checkDigit;
  }


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
    // const idUsuario = this.authService.obtenerIdUsuario();
    // console.log('Este es mi idUsuario Logueado', idUsuario)
    if (this.productoForm.valid) {
      // Generar el código EAN
      const CodEan = this.generateEAN13();

      JsBarcode('#barcode', CodEan, {
        format: 'ean13',
        lineColor: '#000',
        width: 2,
        height: 100,
        displayValue: true
      });

      // Asignarlo al formulario
      this.productoForm.patchValue({ CodEan });

      const idUsuario = this.authService.obtenerIdUsuario();
      this.productoForm.patchValue({ IdUsuarioCreacion: idUsuario });

      const newProduct = this.productoForm.value;

      if (newProduct.IdProducto === ''){
        delete newProduct.IdProducto;
      }

      console.log('Producto agregado:', newProduct);
      this.productosService.registrarProducto(newProduct).subscribe({
        next: (response: any) => {
          console.log(response)
           const mensaje = response.mensaje;
           const producto = response.producto;
           this.toastr.success(mensaje)
           this.CodEanVisible = true;
          
           this.productoForm.patchValue({
              IdProducto: producto.idProducto,
              CodEan: producto.codEan,
              NomProducto: producto.nomProducto,
              Cantidad: producto.cantidad,
              UbicacionProducto: producto.ubicacionProducto,
              Observacion: producto.observacion,
              IdCategoria: producto.idCategoria,
              // IdUsuarioCreacion: idUsuario
          });
        },
        error: (error) => {
          this.toastr.error("Error inesperado")
          this.CodEanVisible = false;
        }
      });
    }
  }
}
