import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JWTTokenService } from '../services/jwt-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(JWTTokenService);
  let router = inject(Router);
  let isLoggedIn = authService.isAuthenticated()! as Boolean;
  if (!isLoggedIn) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
