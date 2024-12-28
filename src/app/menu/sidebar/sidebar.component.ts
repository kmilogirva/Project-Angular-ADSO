import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ]
})
export class SidebarComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isMobileView: boolean = false;
  sidenavMode: 'over' | 'side' = 'over'; 
  isCollapsed = true;

  constructor(private observer: BreakpointObserver) {}

  ngOnInit(): void {
    // Detecta si la pantalla es menor a 768px
    this.observer
      .observe(['(max-width: 768px)'])
      .subscribe((result) => {
        this.isMobileView = result.matches;
        if (this.sidenav) {
          this.sidenav.mode = this.isMobileView ? 'over' : 'side';
          if (this.isMobileView) {
            this.sidenav.close();
          }
        }
      });
  }
}



