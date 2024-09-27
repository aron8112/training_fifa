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

  getAll(): Observable<any> {
    return this.http.get(`${this.playerUrl}/all`);
  }

  getPlayersPages(page: number): Observable<any> {
    console.log('cambiar a pagina', page);
    return this.http.get(`${this.playerUrl}?page=${page}`);
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
      `${this.playerUrl}/search?filter=${column}&search=${search}&exact=${exact}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  createNewPlayer(body: any) {
    let token = localStorage.getItem('token');
    console.log('body from service: ', body);
    return this.http.post(`http://localhost:5000/players/create`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updatePlayer(body: any, id: number) {
    let token = localStorage.getItem('token');
    console.log('body from service: ', body);
    return this.http.put(`http://localhost:5000/players/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
