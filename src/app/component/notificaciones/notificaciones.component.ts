import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';

interface Notificacion {
  id: number;
  tipo: 'SISTEMA' | 'INVENTARIO';
  mensaje: string;
  fecha: Date;
}

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
 
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SidebarComponent, DataTablesModule]
})
export class NotificacionesComponent implements OnInit {
  notificacionForm!: FormGroup;
  notificaciones: Notificacion[] = [];

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.notificacionForm = this.fb.group({
      tipo: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.maxLength(200)]]
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
      }
    };

    this.dtTrigger.next(null);
  }

  get f() {
    return this.notificacionForm.controls;
  }

  enviarNotificacion(): void {
    if (this.notificacionForm.invalid) return;

    const nuevaNotificacion: Notificacion = {
      id: this.notificaciones.length + 1,
      tipo: this.notificacionForm.value.tipo,
      mensaje: this.notificacionForm.value.mensaje,
      fecha: new Date()
    };

    this.notificaciones.push(nuevaNotificacion);
    this.notificacionForm.reset();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
