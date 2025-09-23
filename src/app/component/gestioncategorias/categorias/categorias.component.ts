import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categorias/Categoria';
import { CategoriaService } from 'src/app/services/Categorias/categoria.services';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { TablaCategoriasComponent } from '../tabla-categorias/tabla-categorias.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarComponent,
    TablaCategoriasComponent
  ]
})
export class CategoriasComponent implements OnInit {
  categoriaForm!: FormGroup;
  categorias: Categoria[] = [];
  editando = false;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.instanciarFormulario();
    this.cargarCategorias();
  }

  private instanciarFormulario(): void {
    this.categoriaForm = this.fb.group({
      idCategoria: [''],
      nomCategoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: [true, Validators.required],
      idUsuarioCreacion: [],
      idUsuarioModificacion: [],
      fechaCreacion: [],
      fechaModificacion: []
    });
  }

  onSubmit(): void {
    if (this.categoriaForm.invalid) return;

    const esEdicion = !!this.categoriaForm.value.idCategoria;
    const idUsuario = this.authService.obtenerIdUsuario();

    if (!esEdicion) {
      this.categoriaForm.patchValue({
        idUsuarioCreacion: Number(idUsuario),
        fechaCreacion: new Date()
      });
    } else {
      this.categoriaForm.patchValue({
        idUsuarioModificacion: Number(idUsuario),
        fechaModificacion: new Date()
      });
    }

    const dto: Categoria = this.categoriaForm.value;
    if (!esEdicion) {
  delete dto.idCategoria; // elimina el campo
} 

    const accion$ = esEdicion
      ? this.categoriaService.actualizarCategoria(dto.idCategoria!, dto)
      : this.categoriaService.registrarCategoria(dto);

    accion$.subscribe({
      next: () => {
        this.toastr.success(esEdicion ? 'Categoría actualizada' : 'Categoría registrada');
        this.cargarCategorias();
        this.categoriaForm.reset({ estado: true });
        this.editando = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error al procesar la solicitud');
      }
    });
  }

  private cargarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe({
      next: (cats) => this.categorias = cats,
      error: (err) => {
        console.error(err);
        this.toastr.error('No se pudo cargar la lista de categorías');
      }
    });
  }

  editarCategoria(categoria: Categoria): void {
    this.editando = true;
    this.categoriaForm.patchValue(categoria);
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.categoriaForm.reset({ estado: true });
  }

  eliminarCategoria(id: number | undefined): void {
    if (typeof id === 'number') {
      this.categoriaService.eliminarCategoriasPorIds([id]).subscribe({
        next: () => {
          this.toastr.success('Categoría eliminada');
          this.cargarCategorias();
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Error al eliminar la categoría');
        }
      });
    } else {
      this.toastr.error('ID de categoría no válido');
    }
  }

  get f() {
    return this.categoriaForm.controls;
  }
}