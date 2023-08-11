import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private service: AuthService) {}

  logar(username: string, password: string): Observable<any> {
    var body = { login: username, password: password };

    this.service
      .makeUnAuthenticatedPostRequest<any>('usuarios/logar', body)
      .pipe(
        tap((response) => {
          if (response) {
            localStorage.setItem('token', JSON.stringify(response));
            this.service.isAuthenticatedSubject.next(true);
          }
        })
      )
      .subscribe();

    return this.service.isAuthenticatedSubject.asObservable();
  }
}
