import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bodegas',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './bodegas.component.html',
  styleUrl: './bodegas.component.scss'

})
export class BodegasComponent implements OnInit {
  BodegasForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.instanciarFormulario();
  }

  instanciarFormulario(): void {
    this.BodegasForm = this.fb.group({
      nombreBodega: ['', Validators.required],
      idBodega: ['', Validators.required],
      ubicacion: ['', Validators.required],
      cantidadMaxima: ['', [Validators.required, Validators.min(1)]], // Asegurando que sea al menos 1
    });
  }
get f() {
  return this.BodegasForm.controls;
}
  guardarBodega(): void {
    if (this.BodegasForm.valid) {
      // Aquí puedes acceder a los valores del formulario
      const nuevaBodega = this.BodegasForm.value;
      console.log('Datos de la nueva bodega:', nuevaBodega);
      // Lógica para enviar los datos al servicio o realizar otras acciones
    } else {
      // Marcar los controles como "touched" para mostrar los errores de validación
      Object.values(this.BodegasForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}

   