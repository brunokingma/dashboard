import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Acesso } from '../model/acesso';
import { Usuario } from '../model/usuario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AcessosService {
  static acessoService: any;

  constructor(private service: AuthService) { }
  acessoArray: Acesso[] = [];

  add(acesso: Acesso): Observable<Acesso> {
    return this.service
      .makeAuthenticatedPostRequest<Acesso>('acessos/add', acesso) 
      .pipe(
        map((response: Acesso) => {
          return response;
        })
      );
  }

  update(acesso: Acesso): Observable<Acesso> {
    return this.service
      .makeAuthenticatedPostRequest<Acesso>('acessos/update', acesso)
      .pipe(
        map((response: Acesso) => {
          return response;
        })
      );
  }



  listar(): Observable<Acesso> {
    return this.service
      .makeAuthenticatedGetRequest<Acesso>('acessos/listar')
      .pipe(
        map((response: Acesso) => {
          return response;
        })
      );
  }

  listarall(): Observable<Array<Acesso>> {
    return this.service
      .makeAuthenticatedGetRequest<Array<Acesso>>('acessos/listarall');
  }


  listarAcessoPorUsuario(usuario: Usuario): Observable<Acesso> {
    return this.service
      .makeAuthenticatedPostRequest<Acesso>('acessos/listarporusuario', usuario)
      .pipe(
        map((response: Acesso) => {
          return response;
        })
      );
  }

  pageList(pagina: number): Observable<any> {
    let tamanho = 30;
    let page = {size:tamanho, page:pagina }
    return this.service.makeAuthenticatedPostRequest('acessos/listarAllPaginacao', page);
  }

  buscar(termo: any, pagina: number): Observable<any> {
    let tamanho = 30;
    let page = { size: tamanho, page: pagina, termo:termo }
    return this.service.makeAuthenticatedPostRequest('acessos/buscarAllAcessoPaginacao', page);
  }

}
