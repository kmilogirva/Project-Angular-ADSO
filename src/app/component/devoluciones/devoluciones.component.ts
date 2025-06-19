import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent]
})
export class DevolucionesComponent implements OnInit, OnDestroy {
  devolucionForm!: FormGroup;
  devoluciones: any[] = [];
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.devolucionForm = this.fb.group({
      producto: ['', Validators.required],
      fecha: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      motivo: ['', Validators.required],
      observaciones: ['']
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      destroy: true,
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros por página',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ devoluciones',
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
    return this.devolucionForm.controls;
  }

  onSubmit(): void {
    if (this.devolucionForm.valid) {
      this.devoluciones.push(this.devolucionForm.value);
      this.devolucionForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}