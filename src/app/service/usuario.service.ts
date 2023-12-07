import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {



  constructor(private service: AuthService) { }

  logar(username: string, password: string): Observable<any> {
    const body = { login: username, password: password };

    const loginObservable = this.service.makeUnAuthenticatedPostRequest<any>('usuarios/logar', body)
      .pipe(
        tap((response) => {
          if (response) {
            localStorage.setItem('token', JSON.stringify(response));
            this.service.isAuthenticatedSubject.next(true);
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error.error))
             })
      );

    return loginObservable;
  }

  listar(): Observable<Array<Usuario>> {
    return this.service.makeAuthenticatedGetRequest('usuarios/list');
  }

  add(usuario: Usuario): Observable<Usuario> {
    return this.service.makeAuthenticatedPostRequest('usuarios/add', usuario);
  }

  pageList(pagina: number): Observable<Usuario> {
    let tamanho = 8;
    let page = {size:tamanho, page:pagina}
    return this.service.makeAuthenticatedPostRequest('usuarios/pageList', page);
  }


  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.service.makeAuthenticatedPostRequest('usuarios/update', usuario);
  }
}
