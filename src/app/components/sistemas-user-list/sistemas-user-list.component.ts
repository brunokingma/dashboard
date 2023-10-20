import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sistema } from 'src/app/model/sistema';
import { SistemasService } from 'src/app/service/sistemas.service';
import { SistemaFormComponent } from '../sistemas-form/sistemas-form.component';
import { datautil } from 'src/app/util/datautil';

@Component({
  selector: 'app-sistemas-user-list',
  templateUrl: './sistemas-user-list.component.html',
  styleUrls: ['./sistemas-user-list.component.scss']
})
export class SistemasUserListComponent implements OnInit {

  sistemas: Array<Sistema> = [];
  sistema!: Sistema;
  constructor(private sistemaService: SistemasService,  public dialog: MatDialog){
  }

  datautil(arg0: any) {
    return datautil.dateFormat(arg0);
  }




  icons(status: any): string {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(SistemaFormComponent, {
      data:{
        sistema:this.sistema
      },
      width:'600px',
      disableClose: true
    });
  }

  editar(sistema: Sistema) {
    this.sistema = sistema;
    this.openDialog();
 }

  ngOnInit(): void {
    this.sistemaService.listar().subscribe((r)=>{
      this.sistemas = r;
    });
  }



}
