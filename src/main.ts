import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter,RouterModule } from '@angular/router';
// import { AppComponent } from './app/app.component';
import { MainComponent } from './app/main/main.component';
import { routes } from './app/main/app.routes'; 

import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations'

 import { HttpClientModule } from '@angular/common/http';
  bootstrapApplication(MainComponent, {
    providers: [
      provideAnimations(),
      provideRouter(routes),
     importProvidersFrom(HttpClientModule,ToastrModule.forRoot())
    
    ]
    
  }).catch(err => console.error(err));