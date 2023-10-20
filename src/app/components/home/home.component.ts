import {
  HttpErrorResponse,
  HttpHeaders,
  HttpStatusCode,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SistemasListComponent } from '../sistemas-list/sistemas-list.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private service: AuthService, private router: Router) {}
  error: boolean = false;
  loading: boolean = false;
  loginForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
  //  this.listarUsuarios();
  }

  public listarUsuarios() {
    this.service.makeAuthenticatedGetRequest('usuarios/listar').subscribe();
  }


  
}
