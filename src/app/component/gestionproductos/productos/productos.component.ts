/* =========================================================
   IMPORTS
   ========================================================= */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import JsBarcode from 'jsbarcode';
import { tap, switchMap } from 'rxjs/operators';

import { Producto } from 'src/app/models/productos/Producto';
import { ProductoService } from 'src/app/services/Productos/productos.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { TablaProductosComponent } from '../tabla-productos/tabla-productos.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarComponent,
    TablaProductosComponent
  ]
})
export class ProductosComponent implements OnInit {
  /* ────────────── Propiedades públicas (para la vista) ────────────── */
  productoForm!: FormGroup;
  IdCategoria: number[] = [1, 2, 3, 4];
  CodEanVisible: boolean = false;

  productos: Producto[] = [];

  //  productos: Producto[] = Array.from({ length: 100 }, (_, i) => ({
  //     idProducto: i + 1,
  //     nombreProducto: `Producto ${i + 1}`,
  //     idCategoria: (i % 4) + 1,
  //     ubicacion: `Estante ${(i % 10) + 1}`,
  //     cantidad: Math.floor(Math.random() * 100) + 1,
  //     observacion: ''
  //   }));

  /* ────────────── Constructor (inyección de dependencias) ─────────── */
  constructor(private fb: FormBuilder,
    private productosService: ProductoService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  /* ────────────── Ciclo de vida ────────────── */
  ngOnInit(): void {
    this.instanciarFormulario();
    this.cargarDataProductos();
  }

  /* ────────────── Métodos que usa la plantilla ────────────── */

  /** Alta / edición de producto */
  /** Alta o edición según exista IdProducto */
onSubmit(): void {
  if (this.productoForm.invalid) return;

  const esEdicion = !!this.productoForm.value.IdProducto;
  const idUsuario = this.authService.obtenerIdUsuario();

  if (!esEdicion) {
    const ean = this.generateEAN13().trim();
    this.productoForm.patchValue({
      CodEan: ean,
      IdUsuarioCreacion: Number(idUsuario)
    });

    JsBarcode('#barcode', ean, {
      format: 'ean13',
      lineColor: '#000',
      width: 2,
      height: 100,
      displayValue: true
    });
  } else {
    this.productoForm.patchValue({
      IdUsuarioModificacion: Number(idUsuario)
    });
  }

  // Crear DTO sin campos vacíos
  const dto: any = {};
  for (const key in this.productoForm.value) {
    const value = this.productoForm.value[key];
    if (value !== null && value !== undefined && (typeof value !== 'string' || value.trim() !== '')) {
      dto[key] = value;
    }
  }

  console.log("Esto es lo que voy a enviar al backend", dto);

  const accion$ = esEdicion
    ? this.productosService.actualizarProducto(dto)
    : this.productosService.registrarProducto(dto);

  accion$.subscribe({
    next: (res) => {
      console.log("Respuesta del backend:", res);
      this.toastr.success(esEdicion ? 'Producto actualizado correctamente' : 'Producto registrado correctamente');
      this.cargarDataProductos();
      this.productoForm.reset();
    },
    error: (err) => {
      console.error("Error en la petición:", err);
      this.toastr.error('Error al procesar la solicitud');
    }
  });
}




  private cargarDataProductos(): void {
    this.productosService.obtenerListadoProductos().subscribe({
      next: (producto) => {
        this.productos = producto;
        console.log(producto)

      },
      error: () => this.toastr.error('No se pudo cargar la data de la tabla')
    })
  }

  llenarCamposFormulario(id: number): void {
    if (!id) {
      this.toastr.warning('Id no valido');
      return;
    }

    this.productosService.obtenerProductoPorId(id).subscribe({

      next: (producto) => {
        const ean = (producto.codEan ?? '').trim();
        console.log(ean)
        this.productoForm.patchValue({
          IdProducto: producto.idProducto,
          CodEan: ean,
          NomProducto: producto.nomProducto,
          Cantidad: producto.cantidad,
          UbicacionProducto: producto.ubicacionProducto,
          Observacion: producto.observacion,
          IdCategoria: producto.idCategoria,
          IdUsuarioCreacion : producto.idUsuarioCreacion,
           IdUsuarioModificacion : producto.idUsuarioModificacion
        });

        this.CodEanVisible = true;

        // (opcional) redibujar el código de barras
        JsBarcode('#barcode', ean, {
          format: 'ean13', lineColor: '#000', width: 2, height: 100, displayValue: true
        });
      },
      error: () => this.toastr.error('No se pudo obtener el producto')
    });
  }




  /** Cargar datos en el formulario para editar */

  //   onEditar(prod: Producto) {
  //   /* precargas el formulario para edición */
  //   this.productoForm.patchValue(prod);
  // }

  // /** Eliminar de la lista local (tras éxito en backend) */
  onEliminar(prod: Producto) {
    /* llamas al servicio y, si todo va bien: */
    this.productos = this.productos.filter(p => p.idProducto !== prod.idProducto);
  }

  /* ────────────── Métodos privados utilitarios ────────────── */
  private instanciarFormulario(): void {
    this.productoForm = this.fb.group({
      IdProducto: [''],
      CodEan: [''],
      NomProducto: ['', Validators.required],
      IdCategoria: ['', Validators.required],
      UbicacionProducto: ['', Validators.required],
      Cantidad: ['', [Validators.required, Validators.min(1)]],
      Observacion: [''],
      IdUsuarioCreacion: [],
      IdUsuarioModificacion: [],
    });
  }

  get f() {
    return this.productoForm.controls;
  }

  private generateEAN13(): string {
    const base = Math.floor(100000000000 + Math.random() * 900000000000).toString().substring(0, 12); // 12 dígitos aleatorios
    let sum = 0;
    for (let i = 0; i < base.length; i++) {
      const digit = parseInt(base[i], 10);
      sum += i % 2 === 0 ? digit : digit * 3;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    return base + checkDigit;
  }


}
