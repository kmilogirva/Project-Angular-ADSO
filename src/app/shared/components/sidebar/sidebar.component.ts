import { Component, HostListener, ViewChild,OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavigationService } from '../../Services/NavigationService';
// import { Usuario } from 'src/app/shared/models/Usuario';

interface SubModuloDTO {
  NombreSubModulo: string;
  IconSubModulo: string;
  Ruta: string;
}

interface ModuloDTO {
  NombreModulo: string;
  IconModulo: string;
  items: SubModuloDTO[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isExpanded = window.innerWidth >= 768;
  // isOverMode = window.innerWidth < 768;
  activeModuloIndex: number | null = null;
  isOverMode = false;
  modulosAbiertos: boolean[] = [];


  // usuario: Usuario[] = []
  menuItems: ModuloDTO[] = [];

  ngOnInit(): void {
    // this.checkScreenSize();
    // window.addEventListener('resize', () => this.checkScreenSize());
    this.modulosAbiertos = this.menuItems.map(() => true);
    this.obtenerItemsMenu();
  }

  checkScreenSize() {
  this.isOverMode = window.innerWidth <= 768;
}
  constructor(public router: Router, private authService: AuthService, private navigationService :NavigationService) {}

  // menuItems = [
  //   { label: 'Inicio', icon: 'home', route: '/asignacion-permisos-roles' },
  //   { label: 'Asignación Permisos', icon: 'explore', route: '/asignacion-permisos-roles' },
  //   { label: 'Suscripciones', icon: 'subscriptions', route: '/subscriptions' },
  //   { label: 'Biblioteca', icon: 'video_library', route: '/library' },
  //   { label: 'Historial', icon: 'history', route: '/history' },
  // ];

  obtenerItemsMenu() {
  const usuarioActual = this.authService.usuarioActual;
    console.log("Esto obtengo en usuarioActual", usuarioActual)
  if (usuarioActual && usuarioActual.idRol !== undefined && usuarioActual.idRol !== null) {
    const idRol = usuarioActual.idRol;

    this.authService.obtenerMenuPorRol(idRol).subscribe({
      next: ( data: ModuloDTO[]) => {
        console.log(data)
        // Si el API devuelve un string JSON, parsealo:
        // this.menuItems = JSON.parse(menuJson) as ModuloDTO[];
        this.menuItems = data;

        console.log('Menú parseado:', this.menuItems);
      },
      error: (err) => {
        console.error('Error al obtener el menú:', err);
      }
    });

  } else {
    console.warn('No hay usuario autenticado o idRol no definido');
  }
}

// toggleModulo(index: number) {
//   if (this.activeModuloIndex === index) {
//     this.activeModuloIndex = null; // Cierra si ya estaba abierto
//   } else {
//     this.activeModuloIndex = index; // Abre el seleccionado
//   }
// }
toggleModulo(index: number) {
  this.modulosAbiertos[index] = !this.modulosAbiertos[index];
}

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

   irASubModulo(ruta: string) {
    this.navigationService.navegarSubModulo(ruta);
  }
}

//   navegarSubModulo(ruta: string) {
//   // Si no empieza con "/", se lo agregamos para navegación absoluta
//   if (!ruta.startsWith('/')) {
//     ruta = '/' + ruta;
//   }

//   this.router.navigate([ruta], { replaceUrl: true });
  
//   // Cierra el sidenav si está en modo "over"
//   if (this.isOverMode) {
//     this.sidenav.close();
//   }
// }

// }
