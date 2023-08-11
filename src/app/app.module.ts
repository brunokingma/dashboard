import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import the necessary modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
