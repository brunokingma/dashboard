import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SistemasListComponent } from './components/sistemas-list/sistemas-list.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AcessosComponent } from './components/acessos/acessos.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { SistemaFormComponent } from './components/sistemas-form/sistemas-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SistemasComponent } from './components/sistemas/sistemas.component';
import { SistemasUserListComponent } from './components/sistemas-user-list/sistemas-user-list.component';
import { PaginacaoComponent } from './components/paginacao/paginacao.component';
import { BuscaComponent } from './components/busca/busca.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



 
@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent,SistemasComponent,SistemaFormComponent,SistemasUserListComponent, SistemasListComponent, PerfilComponent, UsuarioComponent, AcessosComponent, UsuarioFormComponent, PaginacaoComponent, BuscaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
