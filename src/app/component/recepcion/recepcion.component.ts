import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent]
})
export class RecepcionComponent implements OnInit, OnDestroy {
  recepcionForm!: FormGroup;
  recepciones: any[] = [];
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.recepcionForm = this.fb.group({
      codigo: ['', Validators.required],
      producto: ['', Validators.required],
      fecha: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      recibidoPor: ['', Validators.required],
      entregadoPor: ['', Validators.required],
      estado: ['', Validators.required]
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      destroy: true,
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros por página',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior'
        }
      }
    };
  }

  get f() {
    return this.recepcionForm.controls;
  }

  onSubmit(): void {
    if (this.recepcionForm.valid) {
      this.recepciones.push(this.recepcionForm.value);
      this.recepcionForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}