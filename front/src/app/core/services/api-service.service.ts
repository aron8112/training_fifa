import {
  HttpClient,
  HttpDownloadProgressEvent,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Players } from '../interfaces/Iplayers';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url: string = 'http://localhost:5000';
  private authUrl: string = 'http://localhost:5000/user/auth';
  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  loginCall(login: string, data: any) {
    return this.http.post(`${this.authUrl}/${login}`, data);
  }

  signUpCall(url: string, data: any) {
    return this.http.post(`${this.authUrl}/${url}`, data);
  }

  getCSV(url: string) {
    // let token = localStorage.getItem('token');
    return this.http.get(`${this.url}/${url}`, {
      // headers: { Autorization: `Bearer ${token}` },
      observe: 'response',
      // reportProgress: true,
      responseType: 'blob',
    });
  }
}
