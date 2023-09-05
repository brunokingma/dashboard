import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SistemasComponent } from './components/sistemas/sistemas.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent} from './components/dialog-component/dialog-component.component'; 
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, SistemasComponent, PerfilComponent, DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
