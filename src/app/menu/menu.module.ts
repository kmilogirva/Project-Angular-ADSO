import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NavbarComponent } from '../menu/navbar/navbar.component';  // Ajusta la ruta según corresponda
// import { SidebarComponent } from '../menu/sidebar/sidebar.component';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatIconModule } from '@angular/material/icon';
// import { MatFormFieldModule } from '@angular/material/form-field'; // Importa este módulo
// import { MatInputModule } from '@angular/material/input';
// import {MatListModule} from '@angular/material/list'; 


@NgModule({
  imports: [
    CommonModule,
    // NavbarComponent,
    // SidebarComponent,
    // MatToolbarModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatListModule,
    // MatFormFieldModule,
    // MatInputModule

  ],
  declarations: [
    // Otros componentes del módulo
  ],
  exports: [
    // Otros componentes que deseas exportar
    // NavbarComponent,  // Exporta el componente si es necesario
    // SidebarComponent
  ]
})
export class MenuModule { }
