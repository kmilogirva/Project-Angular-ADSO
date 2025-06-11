import { Injectable } from '@angular/core';

interface Notificacion {
  id: number;
  tipo: string;
  mensaje: string;
  leida: boolean;
  fecha: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private notificaciones: Notificacion[] = [
    { id: 1, tipo: 'ALERTA', mensaje: 'Intento de acceso no autorizado', leida: false, fecha: new Date() },
    { id: 2, tipo: 'INVENTARIO', mensaje: 'Producto con bajo stock', leida: false, fecha: new Date() },
    { id: 3, tipo: 'INFO', mensaje: 'Nuevo producto agregado', leida: true, fecha: new Date() }
  ];

  obtenerNotificaciones(): Notificacion[] {
    return [...this.notificaciones];
  }

  marcarLeida(id: number): void {
    const noti = this.notificaciones.find(n => n.id === id);
    if (noti) noti.leida = true;
  }

  filtrarPorTipo(tipo: string): Notificacion[] {
    if (!tipo) return this.obtenerNotificaciones();
    return this.notificaciones.filter(n => n.tipo === tipo);
  }
}
