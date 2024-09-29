import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JWTTokenService } from '../services/jwt-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(JWTTokenService);
  let router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
