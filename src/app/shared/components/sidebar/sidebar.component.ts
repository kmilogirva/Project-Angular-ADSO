import { BreakpointObserver , Breakpoints } from '@angular/cdk/layout';
import {  Component, AfterViewInit  } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports:[
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,
    MatListModule,
    CommonModule,
    // NavbarComponent
  ]
})
export class SidebarComponent  implements AfterViewInit {
  sidenavMode: 'side' | 'over' = 'side';
  sidenavOpened = true;

  

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.sidenavMode = 'over';
        this.sidenavOpened = false;  // El sidenav estará cerrado en dispositivos pequeños
      } else {
        this.sidenavMode = 'side';
        this.sidenavOpened = true;  // El sidenav estará abierto en dispositivos grandes
      }
    });
  }

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;  // Cambia entre abierto y cerrado
  }

  
  ngAfterViewInit(): void {
    console.log('SidebarComponent ha sido inicializado en la vista.');
  }
}


  // onSidenavToggle(): void {
  //   this.isSidenavOpen = !this.isSidenavOpen;
  // }
  // public toggleMenu() {
  //   // this.isExpanded = !this.isExpanded;
  // }




