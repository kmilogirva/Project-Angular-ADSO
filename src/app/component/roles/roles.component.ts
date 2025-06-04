
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";

@Component({
  standalone: true,
  imports: [FormsModule, SidebarComponent],
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent{
  rol = {
    nombre: '',
    descripcion: ''
  };

  permisosDisponibles = [
    { id: 'crear', nombre: 'Crear', seleccionado: false },
    { id: 'leer', nombre: 'Leer', seleccionado: false },
    { id: 'editar', nombre: 'Editar', seleccionado: false },
    { id: 'eliminar', nombre: 'Eliminar', seleccionado: false }
  ];

  onSubmit(): void {
    const permisosSeleccionados = this.permisosDisponibles
      .filter(p => p.seleccionado)
      .map(p => p.id);

    const rolCompleto = {
      ...this.rol,
      permisos: permisosSeleccionados
    };

    console.log('Rol a guardar:', rolCompleto);
    // Aquí llamarías a tu servicio para guardar el rol.
    alert('Rol creado exitosamente!');
  }

  cancelar(): void {
    this.rol = { nombre: '', descripcion: '' };
    this.permisosDisponibles.forEach(p => p.seleccionado = false);
  }
}



