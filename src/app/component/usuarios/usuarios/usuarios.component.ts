import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/menu/navbar/navbar.component';
import { SidebarComponent } from 'src/app/menu/sidebar/sidebar.component';
import { ContentComponent } from 'src/app/menu/content/content.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [SidebarComponent,NavbarComponent]

})
export class UsuariosComponent  {
    title = 'proyecto1';
  }
  
