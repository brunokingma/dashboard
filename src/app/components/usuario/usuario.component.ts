import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Acesso } from 'src/app/model/acesso';
import { Sistema } from 'src/app/model/sistema';
import { AcessosService } from 'src/app/service/acessos.service';
import { SistemasService } from 'src/app/service/sistemas.service';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit {

  acessos: Array<Acesso> = [];
  sistemas: Array<Sistema> = [];
  acesso!: Acesso;
  pagina: number = 0;
  totalPages: number = 0;
  totalElements: number = 0;
  first: boolean = false;
  last: boolean = false;
  placeholderText: string = "Buscar por nome";
  termo: string = "";
  
  constructor(private sistemasService: SistemasService, public dialog: MatDialog, private acessoService: AcessosService) {
  }

  openDialog(): void {
   let dialogRef = this.dialog.open(UsuarioFormComponent, {
      data: {
        sistemas: this.sistemas,
        acesso: this.acesso
      },
      width: '600px',
      disableClose: true
    });

    dialogRef.componentInstance.formSubmitted.subscribe(() => {
      this.paginacao(this.pagina);
    });

  }

  editar(acesso: Acesso) {
    this.acesso = acesso;
    this.openDialog();
  }

  busca = (termo: string, pagina: number = 0) => {
    if(termo ===""){0
      this.paginacao(this.pagina);
      return
    }
    this.termo = termo;
    this.acessoService.buscar(termo,pagina).subscribe((r) => {
      this.acessos = r.content;  this.totalPages = r.totalPages;
      this.totalElements = r.totalElements;
    });
  }


  paginacao = (pagina: number) => {    if (this.termo !== "") {
    this.busca(this.termo, pagina);
  } else {
    this.acessoService.pageList(pagina).subscribe((r) => {
      this.acessos = r.content;
      this.totalPages = r.totalPages;
      this.totalElements = r.totalElements;
      this.first = r.first;
      this.last = r.last;
    });
  }}


  ngOnInit(): void {

    this.paginacao(this.pagina);

    this.sistemasService.listar().subscribe((r) => {
      this.sistemas = r;
    });
  }

  extractSystemNames(sistemaArray: Sistema[]): string {
    return sistemaArray.map((s) => s.nome).join(', ');
  }

}
