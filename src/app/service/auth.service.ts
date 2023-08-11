import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Roles } from '../model/roles';
import { Usuario } from '../model/usuario';
import { environment } from 'src/environments /environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.tokenSubject.next('');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  clearStorage() {
    localStorage.removeItem('token');
  }

  makeUnAuthenticatedPostRequest<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, data);
  }

  makeAuthenticatedGetRequest<T>(url: string): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.get<T>(this.apiUrl + url, { headers }).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          this.clearStorage();
          this.router.navigate(['/login']);
        }
        return throwError(() => {
          console.log(error);
        });
      })
    );
  }

  makeAuthenticatedPostRequest<T>(url: string, data: any): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.post<T>(this.apiUrl + url, data, { headers }).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          this.clearStorage();
          this.router.navigate(['/login']);
        }
        return throwError(() => {
          console.log(error);
        });
      })
    );
  }

  makeAuthenticatedPutRequest<T>(url: string, data: any): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.put<T>(this.apiUrl + url, data, { headers }).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          this.clearStorage();
          this.router.navigate(['/login']);
        }
        return throwError(() => {
          console.log(error);
        });
      })
    );
  }

  private getAuthHeaders(): HttpHeaders {
    var localstorage = localStorage.getItem('token');
    var token = localstorage ? JSON.parse(localstorage).token : '';
    if (!token) {
      throw new Error('Token não encontrado.');
    }
    return new HttpHeaders({
      Authorization: token,
    });
  }
}
