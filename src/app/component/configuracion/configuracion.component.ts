import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component'; 
@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,SidebarComponent],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss'
})
export class ConfiguracionComponent implements OnInit {
configuracionForm!: FormGroup; 

constructor(private fb: FormBuilder) {}

ngOnInit(): void {
  this.instanciarFormulario();
  //this.inicializarDataTable();
}

instanciarFormulario(): void{
  this.configuracionForm = this.fb.group({
    idConfiguracion: ['', Validators.required],
    nombreConfiguracion: ['', Validators.required],
    idioma: ['', Validators.required],
    fecha: ['', [Validators.required, Validators.min(1)]],
    zonaHoraria: ['', Validators.required],
    cambioDeEstilo: ['', [Validators.required, Validators.min(0.01)]]
  
});
}

get f() {
  return this.configuracionForm.controls;
}

onSubmit () {}

}

