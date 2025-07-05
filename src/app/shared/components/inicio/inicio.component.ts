import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
//  import { CommonModule } from '@angular/common';
// import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    SidebarComponent
    //  CommonModule,        // *ngFor, *ngIf, etc.
    //  NgbCarouselModule    // <ngb-carousel>
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
}
