import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/Iusers';

@Injectable({
  providedIn: 'root',
})
export class JWTTokenService {
  getCurrentUser() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user;
  }
}
