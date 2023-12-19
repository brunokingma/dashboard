import { Component, OnInit } from '@angular/core';
import { Acesso } from 'src/app/model/acesso';
import { Usuario } from 'src/app/model/usuario';
import { AcessosService } from 'src/app/service/acessos.service';
import { datautil } from 'src/app/util/datautil';

@Component({
  selector: 'app-sistemas-list',
  templateUrl: './sistemas-list.component.html',
  styleUrls: ['./sistemas-list.component.scss']
})
export class SistemasListComponent implements OnInit {
  loading: boolean;
  error: boolean;
  sistemaArray: any[];
  usuario!: Usuario;
  token:any = window.localStorage.getItem("token");
  loadingScreen: boolean = true;
  datautil(arg0: Date) {
    return datautil.dateFormat(arg0);
  }




  constructor(
    private acessosService: AcessosService,
  ) {
    this.error = false;
    this.loading = false;
    this.sistemaArray = [];
  }

  icons(status: string): string {
    switch (status) {
      case 'DESATIVADO':
        return 'bi bi-x-circle vermelho';
      case 'ATIVO':
        return 'bi bi-check2-circle verde';
      case 'MANUTENCAO':
        return 'bi bi-cone-striped laranja';
      case 'FORADOAR':
        return 'bi bi-exclamation-circle vermelho';
      default:
        return '';
    }
  }

  abrirURL(url: string) {
    if (url) {
      const token =  window.localStorage.getItem("token");
      window.open(url+"?token="+token, '_blank');
    }
  }
  
  ngOnInit(): void {

    this.acessosService.listar().subscribe((acesso: Acesso) => {
      this.sistemaArray = acesso.sistema;
      this.usuario = acesso.usuario;
      this.loadingScreen = false;
    });

  }

}
