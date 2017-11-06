import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { MenuComponent } from './_components/menu/menu.component';
import { AuthentificationGuard } from './_guards/index';
import { AlertComponent } from './_directives/alert/alert.component';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { AlertService, AuthentificationService, UserService } from './_services/index';

@NgModule({
    declarations: [
        AppComponent, MenuComponent, AlertComponent, HomeComponent, LoginComponent, RegisterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        AuthentificationGuard,
        AlertService,
        AuthentificationService,
        UserService
 
        // providers used to create fake backend
        //fakeBackendProvider,
        //MockBackend,
        //BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }