import { Component, HostListener, ViewChild } from '@angular/core';
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
export class SidebarComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isExpanded = window.innerWidth >= 768;
  isOverMode = window.innerWidth < 768;

  constructor(public router: Router) {}

  menuItems = [
    { label: 'Inicio', icon: 'home', route: '/home' },
    { label: 'Explorar', icon: 'explore', route: '/explore' },
    { label: 'Suscripciones', icon: 'subscriptions', route: '/subscriptions' },
    { label: 'Biblioteca', icon: 'video_library', route: '/library' },
    { label: 'Historial', icon: 'history', route: '/history' },
  ];

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }
}