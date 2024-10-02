import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class JWTTokenService {
  private storageSubject = new BehaviorSubject({});
  plat = inject(PLATFORM_ID);

  setUser(token: string) {
    if (isPlatformBrowser(this.plat)) {
      localStorage.setItem('token', token);
    }
  }

  getName() {
    try {
      if (isPlatformBrowser(this.plat)) {
        let token = localStorage.getItem('token') as string;
        let payload = JSON.parse(atob(token.split('.')[1]));
        return payload.name;
      }
    } catch (error) {
      console.log('Registrese para ingresar a las funciones de la página');
    }
  }

  getEmail() {
    try {
      if (isPlatformBrowser(this.plat)) {
        let token = localStorage.getItem('token') as string;
        let payload = JSON.parse(atob(token.split('.')[1]));
        return payload.email;
      }
    } catch (error) {
      console.log('Registrese para ingresar a las funciones de la página');
    }
  }

  public isAuthenticated() {
    if (isPlatformBrowser(this.plat)) {
      let token = localStorage.getItem('token');
      return token;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
