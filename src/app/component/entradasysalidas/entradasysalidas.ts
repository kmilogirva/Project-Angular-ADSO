import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Producto } from 'src/app/models/productos/Producto';
import { Movimiento } from 'src/app/models/movimientos/Movimiento';
import { ProductoService } from 'src/app/services/Productos/productos.service';
import { MovimientoService } from 'src/app/services/Movimientos/movimiento.service';
import { AuthService } from 'src/app/core/services/auth.service';

import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { TablaEntradasSalidasComponent } from '../entradasysalidas/tabla-entradasysalidas/tabla-entradasysalidas.component';

@Component({
  selector: 'app-entradas-salidas',
  templateUrl: './entradasysalidas.component.html',
  styleUrls: ['./entradasysalidas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarComponent,
   TablaEntradasSalidasComponent
  ]
})
export class EntradasSalidasComponent implements OnInit {
  movimientoForm!: FormGroup;
  productos: Producto[] = [];
  movimientos: Movimiento[] = [];

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private movimientoService: MovimientoService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.instanciarFormulario();
    this.cargarProductos();
    this.cargarMovimientos();
  }

  instanciarFormulario(): void {
    this.movimientoForm = this.fb.group({
      IdMovimiento: [null],
      IdProducto: ['', Validators.required],
      TipoMovimiento: ['', Validators.required],
      Cantidad: [1, [Validators.required, Validators.min(1)]],
      Observacion: ['']
    });
  }

  get f() {
    return this.movimientoForm.controls;
  }

  onSubmit(): void {
    if (this.movimientoForm.invalid) return;

    const esEdicion = !!this.movimientoForm.value.IdMovimiento;
    const idUsuario = this.authService.obtenerIdUsuario();

    const dto = {
      ...this.movimientoForm.value,
      IdUsuarioCreacion: esEdicion ? null : Number(idUsuario),
      IdUsuarioModificacion: esEdicion ? Number(idUsuario) : null
    };

    console.log("Movimiento enviado al backend:", dto);

    const accion$ = esEdicion
      ? this.movimientoService.actualizarMovimiento(dto)
      : this.movimientoService.registrarMovimiento(dto);

    accion$.subscribe({
      next: () => {
        this.toastr.success(esEdicion ? 'Movimiento actualizado correctamente' : 'Movimiento registrado correctamente');
        this.cargarMovimientos();
        this.movimientoForm.reset();
      },
      error: (err) => {
        console.error("Error en la petición:", err);
        this.toastr.error('Error al procesar la solicitud');
      }
    });
  }

  private cargarProductos(): void {
    this.productoService.obtenerListadoProductos().subscribe({
      next: (data) => this.productos = data,
      error: () => this.toastr.error('No se pudo cargar la lista de productos')
    });
  }

  private cargarMovimientos(): void {
    this.movimientoService.obtenerListadoMovimientos().subscribe({
      next: (data) => this.movimientos = data,
      error: () => this.toastr.error('No se pudo cargar la lista de movimientos')
    });
  }

  llenarCamposFormulario(id: number): void {
    this.movimientoService.obtenerMovimientoPorId(id).subscribe({
      next: (mov) => this.movimientoForm.patchValue(mov),
      error: () => this.toastr.error('No se pudo obtener el movimiento')
    });
  }

  onEliminar(id: number): void {
    this.movimientoService.eliminarMovimiento(id).subscribe({
      next: () => {
        this.toastr.success('Movimiento eliminado correctamente');
        this.cargarMovimientos();
      },
      error: () => this.toastr.error('Error al eliminar el movimiento')
    });
  }
}
