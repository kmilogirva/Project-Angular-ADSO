import { Component,HostListener,ViewChild  } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav'; 

@Component({
  selector: 'app-sidebar',
  standalone: true, // ✅ IMPORTANTE
  imports: [CommonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule,MatFormFieldModule,MatInputModule,MatButtonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav; 
  isExpanded = window.innerWidth >= 768;
  isOverMode = window.innerWidth < 768;


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
//   @HostListener('window:resize', ['$event'])
// onResize(event: any) {
//   const width = event.target.innerWidth;
//   this.isOverMode = width < 768;
//   this.isExpanded = !this.isOverMode; // Se cierra si es menor a 768px

  
}
