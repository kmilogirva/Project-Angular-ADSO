import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MainComponent } from './app/main/main.component';
import { routes } from './app/main/app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './app/interceptor/jwt.interceptor'; // ✅ nombre correcto

import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
 import { HttpClient } from '@angular/common/http';

bootstrapApplication(MainComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtInterceptor])
    ),
    importProvidersFrom(
      HttpClient,
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        timeOut: 3000
      })
    )
  ]
}).catch(err => console.error(err));
