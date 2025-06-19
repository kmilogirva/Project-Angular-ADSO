import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent]
})
export class ReportesComponent implements OnInit, OnDestroy {
  reporteForm!: FormGroup;
  movimientos: any[] = [];
  movimientosFiltrados: any[] = [];
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reporteForm = this.fb.group({
      filtroNombre: ['']
    });

    this.movimientos = [
      { tipo: 'Ingreso', producto: 'Camisa Azul', cantidad: 10, fecha: '2024-06-01' },
      { tipo: 'Salida', producto: 'Pantalón Negro', cantidad: 3, fecha: '2024-06-03' },
      { tipo: 'Devolución', producto: 'Gorra Roja', cantidad: 1, fecha: '2024-06-05' }
    ];

    this.movimientosFiltrados = [...this.movimientos];

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      destroy: true,
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros por página',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ movimientos',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior'
        }
      }
    };
  }

  onFiltrar(): void {
    const nombre = this.reporteForm.value.filtroNombre?.toLowerCase() || '';
    this.movimientosFiltrados = this.movimientos.filter(m => m.producto.toLowerCase().includes(nombre));
  }

  exportar(): void {
    const datos = JSON.stringify(this.movimientosFiltrados, null, 2);
    const blob = new Blob([datos], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte_movimientos.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}