import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { VentasListComponent } from './components/ventas-list/ventas-list.component';
import { VentasEditComponent } from './components/ventas-edit/ventas-edit.component';
import { LoginComponent } from './components/login/login.component';
import { SucursalesListComponent } from './components/sucursales-list/sucursales-list.component';
import { ClientesListComponent } from './components/clientes-list/clientes-list.component';

@NgModule({ declarations: [
        AppComponent,
        VentasListComponent,
        LoginComponent,
        SucursalesListComponent,
        ClientesListComponent,
        VentasEditComponent
    ],
    bootstrap: [AppComponent], 
    imports: [BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule], providers: [ApiService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
