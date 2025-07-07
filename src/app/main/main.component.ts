import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule,CommonModule ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']  
})
export class MainComponent {

}
