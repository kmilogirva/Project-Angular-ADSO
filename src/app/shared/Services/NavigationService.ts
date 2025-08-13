import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {}

  navegarSubModulo(ruta: string): void {
    // Si no empieza con "/", se lo agregamos para navegación absoluta
    if (!ruta.startsWith('/')) {
      ruta = '/' + ruta;
    }
    this.router.navigate([ruta]);
  }
}