import { Component, HostListener, ViewChild, OnInit } from '@angular/core';
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
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavigationService } from '../../Services/NavigationService';

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
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isExpanded = window.innerWidth >= 768;
  isOverMode = window.innerWidth <= 768;
  modulosAbiertos: boolean[] = [];

  menuItems: ModuloDTO[] = [];
  usuario: any;

  constructor(
    public router: Router,
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.obtenerItemsMenu();
    this.usuario = this.authService.usuarioActual;
  }

  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isOverMode = window.innerWidth <= 768;
    this.isExpanded = !this.isOverMode;
  }

  obtenerItemsMenu() {
    const usuarioActual = this.authService.usuarioActual;
    if (usuarioActual && usuarioActual.idRol !== undefined && usuarioActual.idRol !== null) {
      const idRol = usuarioActual.idRol;
      this.authService.obtenerMenuPorRol(idRol).subscribe({
        next: (data: ModuloDTO[]) => {
          this.menuItems = data;
          this.modulosAbiertos = this.menuItems.map(() => true); // abrir todos por defecto
        },
        error: (err) => {
          console.error('Error al obtener el menú:', err);
        }
      });
    } else {
      console.warn('No hay usuario autenticado o idRol no definido');
    }
  }

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
    if (this.isOverMode && this.sidenav) {
      this.sidenav.close();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
