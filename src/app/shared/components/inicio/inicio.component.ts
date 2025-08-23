import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AfterViewInit } from '@angular/core';
import { Carousel } from 'bootstrap';
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

export class InicioComponent implements AfterViewInit {

  ngAfterViewInit() {
    const myCarouselElement = document.querySelector('#carouselInicio');
    if (myCarouselElement) {
      new Carousel(myCarouselElement, {
        interval: 2500,
        ride: 'carousel',
        pause: false
      });
    }
  }
}
