import { inject } from '@angular/core';
import { CanActivateFn,Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (_route, state) => {
  console.log('🔥 authGuard revisando acceso a', state.url);
  const auth   = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn()
    ? true
    : router.createUrlTree(['/acceso'], { queryParams: { returnUrl: state.url } });
};
