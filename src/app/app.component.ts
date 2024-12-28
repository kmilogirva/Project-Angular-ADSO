import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  sidenavMode: 'over' | 'side' = 'over'; 
  isCollapsed = true;


  constructor(private observer: BreakpointObserver) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        // Pantalla pequeña: sidenav en modo "over"
        this.isMobile = true;
        this.sidenavMode = 'over';
      } else {
        // Pantalla grande: sidenav en modo "side"
        this.isMobile = false;
        this.sidenavMode = 'side';
      }
    });
  }

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
}


// import { BreakpointObserver } from '@angular/cdk/layout';
// import {
//   Component,
//   ViewChild,
// } from '@angular/core';
// import { MatSidenav } from '@angular/material/sidenav';




// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.scss'],
//   export class AppComponent {
//     title = 'material-responsive-sidenav';
//     @ViewChild(MatSidenav)
//     sidenav!: MatSidenav;
//     isMobile= true;
//     sidenavMode: 'over' | 'side' = 'over'; 
//     isCollapsed = true;
  
  
//     constructor(private observer: BreakpointObserver) {}
