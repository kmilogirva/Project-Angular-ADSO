import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.scss'],
  standalone: true,
  imports: [CommonModule, SidebarComponent]
})
export class AuditoriaComponent implements OnInit, OnDestroy {
  logs: any[] = [];
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.logs = [
      { usuario: 'Juan C', accion: 'Creó un rol', fecha: '2025-06-01', hora: '10:30 AM' },
      { usuario: 'Juan P', accion: 'Actualizó permisos', fecha: '2025-06-02', hora: '11:00 AM' },
      { usuario: 'Kevin', accion: 'Eliminó módulo', fecha: '2025-06-03', hora: '02:15 PM' },
      { usuario: 'Cristian', accion: 'Actualizó permisos', fecha: '2025-06-02', hora: '11:00 AM' }
    ];

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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}