import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
@Component({
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,SidebarComponent],
  selector: 'app-categorias', // Selector CSS para usar este componente en las plantillas
  templateUrl: './categorias.component.html', // Ruta al archivo HTML del componente
  styleUrls: ['./categorias.component.scss'] // Ruta al archivo de estilos (Sass) del componente

})
export class CategoriasComponent implements OnInit {
  categoriasForm!: FormGroup;

  categorias: any[] = []; // Ejemplo: Array para almacenar las categorías

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Aquí puedes cargar las categorías al inicializarse el componente
    this.instanciarFormulario();
    this.cargarCategorias();
  }

  instanciarFormulario(): void {
    this.categoriasForm = this.fb.group({
      categoria: ['',[Validators.required]]
    });
  }
  cargarCategorias(): void {
    // Lógica para obtener las categorías (ejemplo simulado)
    this.categorias = [
      { id: 1, nombre: 'Electrónicos' },
      { id: 2, nombre: 'Ropa' },
      { id: 3, nombre: 'Alimentos' }
    ];
  }

  agregarCategoria(): void {
    // Lógica para agregar una nueva categoría
    console.log('Agregar nueva categoría');
  }

  editarCategoria(categoriaId: number): void {
    // Lógica para editar una categoría existente
    console.log('Editar categoría:', categoriaId);
  }

  eliminarCategoria(categoriaId: number): void {
    // Lógica para eliminar una categoría
    console.log('Eliminar categoría:', categoriaId);
  }

}