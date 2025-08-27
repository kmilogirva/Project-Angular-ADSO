import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { BodegasService, Bodega } from 'src/app/services/Bodegas/bodegas.service';
import { TablaBodegasComponent } from 'src/app/component/bodegas/tabla-bodegas/tabla-bodegas.component';

@Component({
  selector: 'app-bodegas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SidebarComponent,
    TablaBodegasComponent  
  ],
  templateUrl: './bodegas.component.html',
  styleUrls: ['./bodegas.component.scss'],
  providers: [BodegasService]
})
export class BodegasComponent implements OnInit {
  BodegasForm!: FormGroup;
  bodegas: Bodega[] = [];
  editando = false;

  private fb = inject(FormBuilder);
  private bodegasService = inject(BodegasService);

  ngOnInit(): void {
    this.instanciarFormulario();
    this.cargarBodegas();
  }

  instanciarFormulario(): void {
    this.BodegasForm = this.fb.group({
      idBodega: [''],
      nombreBodega: ['', Validators.required],
      ubicacion: ['', Validators.required],
      cantidadMaxima: ['', [Validators.required, Validators.min(1)]],
      idEstado: [true, Validators.required],
      fechaCreacion: [null],
      idUsuarioCreacion: [1],
      fechaModificacion: [null],
      idUsuarioModificacion: [null]
    });
  }

  get f() {
    return this.BodegasForm.controls;
  }

  guardarBodega(): void {
    if (this.BodegasForm.valid) {
      const bodega = this.BodegasForm.value;
      console.log("📤 Enviando al backend:", bodega);

      // limpiar id si viene vacío
      if (bodega.idBodega === '' || bodega.idBodega === null) {
        delete bodega.idBodega;
      }

      if (!bodega.idBodega) {
        this.bodegasService.crearBodega(bodega).subscribe({
          next: (res) => {
            console.log('✅ Bodega creada:', res);
            this.BodegasForm.reset();
            this.cargarBodegas();
          },
          error: (err: any) => console.error('❌ Error al crear:', err)
        });
      } else {
        this.bodegasService.actualizarBodega(bodega).subscribe({
          next: () => {
            console.log('✅ Bodega actualizada');
            this.BodegasForm.reset();
            this.editando = false;
            this.cargarBodegas();
          },
          error: (err: any) => console.error('❌ Error al actualizar:', err)
        });
      }
    }
  }

  cargarBodegas(): void {
    this.bodegasService.listarBodegas().subscribe({
      next: (res) => {
        console.log("📥 Listado recibido:", res);
        this.bodegas = res;
      },
      error: (err: any) => console.error('❌ Error al listar:', err)
    });
  }

  editarBodega(bodega: Bodega): void {
    this.BodegasForm.patchValue(bodega);
    this.editando = true;
  }

  eliminarBodega(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta bodega?')) {
      this.bodegasService.eliminarBodega(id).subscribe({
        next: () => {
          console.log('✅ Bodega eliminada');
          this.cargarBodegas();
        },
        error: (err: any) => console.error('❌ Error al eliminar:', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.BodegasForm.reset();
    this.editando = false;
  }
}
