import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Sistema } from '../model/sistema';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SistemasService {



  constructor(private service: AuthService) { }


  sistemaArray: Sistema[] = [];


  buscar(termo: any, pagina: number): Observable<any> {
    let tamanho = 30;
    let page = { size: tamanho, page: pagina, termo:termo }
    return this.service.makeAuthenticatedPostRequest('sistemas/buscarAllSistemaPaginacao', page);
  }

  
  listar(): Observable<Sistema[]> {
    return this.service
      .makeAuthenticatedGetRequest<Sistema[]>('sistemas/listar')
      .pipe(
        map((response: Sistema[]) => {
          return response;
        })
      );
  }
  add(sistema: Sistema): Observable<Sistema> {
    return this.service.makeAuthenticatedPostRequest('sistemas/add', sistema);
  }

  updateSistema(sistema: Sistema): Observable<Sistema> {
    return this.service.makeAuthenticatedPostRequest('sistemas/update', sistema);
  }

  pageList(pagina: number): Observable<any> {
    let tamanho = 30;
    let page = { size: tamanho, page: pagina }
    return this.service.makeAuthenticatedPostRequest('sistemas/listarAllPaginacao', page);
  }


}
