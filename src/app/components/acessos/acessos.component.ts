import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-acessos',
  templateUrl: './acessos.component.html',
  styleUrls: ['./acessos.component.scss']
})
export class AcessosComponent implements OnInit {

  usuarios: Array<Usuario> = [];
  constructor(private usuarioService: UsuarioService){
  }
  ngOnInit(): void {
    this.usuarioService.listar().subscribe((r)=>{
      this.usuarios = r;
    });
  }



}
