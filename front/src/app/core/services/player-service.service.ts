import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Players } from '../interfaces/Iplayers';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playerUrl: string = 'http://localhost:5000/players';
  public httpHeaders = new HttpHeaders();
  players$ = Observable<Players[]>;

  constructor(private http: HttpClient) {
    this.setDefaultHeaders();
  }

  public setDefaultHeaders(): void {
    this.httpHeaders = new HttpHeaders();
    this.httpHeaders
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  }

  getPlayers(): Observable<any> {
    return this.http.get(this.playerUrl);
  }

  getPlayerInformation(url: string): Observable<any> {
    return this.http.get(url);
  }

  getPlayerById(id: number | string): Observable<any> {
    let token = localStorage.getItem('token');
    // console.log(id);
    return this.http.get(`${this.playerUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  searchFilteredPlayers(params: any): Observable<any> {
    let token = localStorage.getItem('token');
    let { column, search, exact, page } = params;
    console.log(
      `${this.playerUrl}/search?filter=${column}&search=${search}&exact=${exact}&page=${page}`
    );
    return this.http.get(
      `${
        this.playerUrl
      }/search?filter=${column}&search=${search}&exact=${exact}&page=${1}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
