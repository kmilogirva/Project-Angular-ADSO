import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-bodegas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SidebarComponent],
  templateUrl: './bodegas.component.html',
  styleUrls: ['./bodegas.component.scss']
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
      idBodega: [''],
      ubicacion: ['', Validators.required],
      cantidadMaxima: ['', [Validators.required, Validators.min(1)]],
    });
  }

  get f() {
    return this.BodegasForm.controls;
  }

  guardarBodega(): void {
    if (this.BodegasForm.valid) {
      const nuevaBodega = this.BodegasForm.value;
      console.log('Datos de la nueva bodega:', nuevaBodega);
      // Aquí podrías llamar a un servicio
    } else {
      Object.values(this.BodegasForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
