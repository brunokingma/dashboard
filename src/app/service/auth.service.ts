import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, catchError, tap } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  constructor(private http: HttpClient, private router: Router) { }
  private arrayErrosStatus = [401, 500, 503, 400]
  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.deleteCookei();
    this.tokenSubject.next('');
  }

  private deleteCookei() {
    const currentDate = new Date();
    const pastDate = new Date(currentDate.getTime() - 60 * 60 * 1000); // One hour in the past
    const pastDateString = pastDate.toUTCString();
  
    document.cookie = `token=; expires=${pastDateString}; path=/; Secure; SameSite=Strict`;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  clearStorage() {
    localStorage.removeItem('token');
  }

  makeUnAuthenticatedPostRequest<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, data)
  }

  makeUnAuthenticatedGetRequest<T>(url: string): Observable<T> {
    return this.http.get<T>(this.apiUrl + url)
  }

  makeAuthenticatedGetRequest<T>(url: string): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.get<T>(this.apiUrl + url, { headers }).pipe(
      catchError((error: any) => {
        if (this.arrayErrosStatus.includes(error.status)) {
          this.clearStorage();
          this.router.navigate(['/login']);
        }
        return throwError(() => new Error(error.statusText));
      })
    );
  }

  makeAuthenticatedPostRequest<T>(url: string, data: any): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.post<T>(this.apiUrl + url, data, { headers }).pipe(
      catchError((error: any) => {
        if (this.arrayErrosStatus.includes(error.status)) {
          this.clearStorage();
          this.router.navigate(['/login']);
        }
        return throwError(() => new Error(error.statusText));
      })
    );
  }

  makeAuthenticatedPutRequest<T>(url: string, data: any): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.put<T>(this.apiUrl + url, data, { headers }).pipe(
      catchError((error: any) => {
        if (this.arrayErrosStatus.includes(error.status)) {
          this.clearStorage();
          this.router.navigate(['/login']);
        }
        return throwError(() => new Error(error.statusText));
      })
    );
  }

  private getAuthHeaders(): HttpHeaders {
    var localstorage = localStorage.getItem('token');
    localstorage = this.cookeiReadToken();
    
    var token = localstorage ? JSON.parse(localstorage).token : '';
    if (!token) {
      throw new Error('Token não encontrado.');
    }
    return new HttpHeaders({
      Authorization: token,
    });
  }


  private cookeiReadToken(): string {
    const cookei = document.cookie;
    let token = "";
    if (cookei) {
      const tokenCookie = cookei.split("; ").find(row => row.startsWith("token="));
      if (tokenCookie) {
        token = tokenCookie.split("=")[1];
      }
    }
    return token;
  }


  
}
