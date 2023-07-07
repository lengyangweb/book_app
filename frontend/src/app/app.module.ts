import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

// primeng
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    SignUpComponent,
    HeaderComponent,
    HomeComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    FormsModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
