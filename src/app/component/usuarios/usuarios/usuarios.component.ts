import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { ContentComponent } from 'src/app/menu/content/content.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  // imports: [NavbarComponent]

})
export class UsuariosComponent  {
    title = 'proyecto1';
  }
  
