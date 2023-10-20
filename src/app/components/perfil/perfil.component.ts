import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES } from 'src/app/enums/roles';
import { STATUS } from 'src/app/enums/status';
import { Acesso } from 'src/app/model/acesso';
import { Roles } from 'src/app/model/roles';
import { AcessosService } from 'src/app/service/acessos.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  today = new Date();
  mes = new Date().toLocaleString('default', { month: 'long' });
  ano = new Date().getFullYear();
  ativo: number = 0;
  manutecao: number = 0;
  desativado: number = 0;
  foradoar: number = 0;
  usuario: string = "";
  email: string = "";
  acessos: Array<string> = [];
  role: ROLES = ROLES.USUARIO;




  constructor(private router: Router, private acessosService: AcessosService) { }

  openRedirect(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }






  ngOnInit(): void {

    this.acessosService.listar().subscribe((acesso: Acesso) => {

      if (acesso === null) {
        return;
      }

      if (acesso.usuario && acesso.usuario.nome) {
        this.usuario = acesso.usuario.nome;
      } else {
        this.usuario = ""; // or handle the default case as needed
      }

      if (acesso.usuario && acesso.usuario.email) {
        this.email = acesso.usuario.email;
      } else {
        this.email = ""; // or handle the default case as needed
      }

      this.acessos.push(acesso.usuario.role ? acesso.usuario.role : "");

      acesso.sistema.forEach(sistema => {

        switch (sistema.status) {
          case STATUS.ATIVO:
            this.ativo = this.ativo + 1;
            break;
          case STATUS.DESATIVADO:
            this.desativado = this.desativado + 1;
            break;
          case STATUS.MANUTENCAO:
            this.manutecao = this.manutecao + 1;
            break;
          case STATUS.FORADOAR:
            this.foradoar = this.foradoar + 1;
            break;
        }
      });
      this.role = acesso.usuario.role as ROLES; 
    });

  }



}
