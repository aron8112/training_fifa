import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JWTTokenService } from '../services/jwt-auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  let authService = inject(JWTTokenService);
  let router = inject(Router);
  let isLoggedIn = await authService.isAuthenticated()!;
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
