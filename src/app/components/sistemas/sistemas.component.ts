import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sistema } from 'src/app/model/sistema';
import { SistemasService } from 'src/app/service/sistemas.service';
import { SistemaFormComponent } from '../sistemas-form/sistemas-form.component';
@Component({
  selector: 'app-sistemas',
  templateUrl: './sistemas.component.html',
  styleUrls: ['./sistemas.component.scss']
})
export class SistemasComponent implements OnInit {

  sistemas: Array<Sistema> = [];
  sistema!: Sistema;
  totalPages: number = 0;
  totalElements: number = 0;
  first: boolean = false;
  last: boolean = false;
  placeholderText: string = "Buscar por nome";
  termo: string = "";
  pagina:number = 0;
  constructor(private sistemaService: SistemasService, public dialog: MatDialog) {
  }


  openDialog(): void {

    const dialogRef = this.dialog.open(SistemaFormComponent, {
      data: {
        sistema: this.sistema
      },
      width: '600px',
      disableClose: true
    });

    dialogRef.componentInstance.formSubmitted.subscribe(() => {
      this.paginacao(this.pagina);
    });

  }


  busca = (termo: string, pagina: number = 0) => {
    if(termo ===""){
      this.paginacao(this.pagina);
      return
    }
    this.termo = termo;
    this.sistemaService.buscar(termo, pagina).subscribe((r) => {
      this.sistemas = r.content;
      this.totalPages = r.totalPages;
      this.totalElements = r.totalElements;
    });
  }

  editar(sistema: Sistema) {
    this.sistema = sistema;
    this.openDialog();
  }

  paginacao = (pagina: number) => {

    if (this.termo !== "") {
      this.busca(this.termo, pagina);
    } else {
      this.sistemaService.pageList(pagina).subscribe((r) => {
        this.sistemas = r.content;
        this.totalPages = r.totalPages;
        this.totalElements = r.totalElements;
        this.first = r.first;
        this.last = r.last;
      });
    }

  }



  ngOnInit(): void {
    this.paginacao(this.pagina);
  }



}
