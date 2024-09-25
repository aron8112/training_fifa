import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JWTTokenService } from '../services/jwt-auth.service';

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let JWT = inject(JWTTokenService);
  let routes = inject(Router);
  let getToken = JWT.getCurrentUser();
  if (!getToken) {
    routes.navigate(['login']);
    return false;
  }
  routes.navigate(['home']);
  return true;
};
