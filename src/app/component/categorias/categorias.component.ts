import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { CategoriaService, Categoria } from 'src/app/services/Categorias/categoria.services';
import { environment } from 'src/environments/environment';

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
    FormsModule
    // DataTablesModule
  ]
})
export class CategoriasComponent implements OnInit {
  categoriaForm!: FormGroup;
  categorias: Categoria[] = [];
  editando = false;
  categoriaEditandoId: number | null = null;

  dtOptions: any = {}; 
  dtTrigger: Subject<any> = new Subject<any>();
  // @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      nomCategoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: [true, Validators.required]
    });

  //   this.dtOptions = {
  //   pagingType: 'full_numbers',
  //   pageLength: 5,
  //   language: environment.espanol
  // };

    this.cargarCategorias();
  }

  get f() {
    return this.categoriaForm.controls;
  }

   cargarCategorias() {
    this.categoriaService.listarCategorias().subscribe({
      next: (data) => {
        this.categorias = data;

        console.log("Categorías cargadas:", data);
      },
      error: (err) => console.error('Error al cargar categorías', err)
    });
  }
  

  // ngOnDestroy(): void {
  //   this.dtTrigger.unsubscribe();
  // }

  registrarCategoria(): void {
    if (this.categoriaForm.invalid) return;

    if (this.editando && this.categoriaEditandoId !== null) {
      const categoriaActualizada: Categoria = {
        ...this.categoriaForm.value,
        idCategoria: this.categoriaEditandoId,
        fechaModificacion: new Date(),
        idUsuarioModificacion: 1
      };

      this.categoriaService.actualizarCategoria(categoriaActualizada).subscribe({
        next: (response) => {
          console.log(response)
          this.resetFormulario();
          this.cargarCategorias();
        },
        error: (err) => console.error('Error al actualizar categoría', err)
      });
    } else {
      const nuevaCategoria: Categoria = {
        ...this.categoriaForm.value,
        fechaCreacion: new Date(),
        idUsuarioCreacion: 1
      };

      this.categoriaService.registrarCategoria(nuevaCategoria).subscribe({
        next: (response) => {
          console.log(response)
          this.resetFormulario();
          this.cargarCategorias();
        },
        error: (err) => console.error('Error al registrar categoría', err)
      });
    }
  }

  editarCategoria(categoria: Categoria): void {
    this.categoriaForm.patchValue({
      nomCategoria: categoria.nomCategoria,
      descripcion: categoria.descripcion,
      estado: categoria.estado
    });

    this.editando = true;
    this.categoriaEditandoId = categoria.idCategoria ?? null;
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  resetFormulario(): void {
    this.editando = false;
    this.categoriaEditandoId = null;
    this.categoriaForm.reset({ estado: true });
  }

  eliminarCategoria(id: number): void {
  if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
    this.categoriaService.eliminarCategoriasPorIds([id]).subscribe({
      next: () => {
        alert('Categoría eliminada con éxito');
        this.cargarCategorias(); // recarga la lista
      },
      error: (err) => {
        console.error('Error al eliminar la categoría', err);
        alert('Error al eliminar la categoría');
      }
    });
  }
}

}
