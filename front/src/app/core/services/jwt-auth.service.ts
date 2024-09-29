import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/Iusers';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JWTTokenService {
  token: string = '';
  name!: string;
  role!: string;

  getToken() {
    return this.token;
  }

  getName() {
    return this.name;
  }

  setUser(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
    this.setName();
  }

  getCurrentUser() {
    if (this.token) {
      return true;
    }
    return false;
  }

  setName() {
    let payload = JSON.parse(atob(this.token.split('.')[1]));
    this.name = payload.name;
  }

  setRole() {
    let payload = JSON.parse(atob(this.token.split('.')[1]));
    this.name = payload.role;
  }

  public isAuthenticated(): Observable<boolean> {
    if (this.token === '') {
      return of(false);
    }
    return of(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.token = '';
    this.name = '';
    this.role = '';
  }
}
