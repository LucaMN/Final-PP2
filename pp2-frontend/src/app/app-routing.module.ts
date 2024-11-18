// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasListComponent } from './components/ventas-list/ventas-list.component';
import { VentasEditComponent } from './components/ventas-edit/ventas-edit.component';
import { SucursalesListComponent } from './components/sucursales-list/sucursales-list.component';
import { GraficoComponent } from './grafico/grafico.component'; 
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { ClientesListComponent } from './components/clientes-list/clientes-list.component';
import { GraficoBarrasComponent } from './grafico-barras/grafico-barras.component';
import { GraficoBarrasApiladasComponent } from './grafico-barras-apiladas/grafico-barras-apiladas.component';


const routes: Routes = [
  { path: 'ventas', component: VentasListComponent },
  { path: 'ventas/editar', component: VentasEditComponent, canActivate: [AuthGuard] },
  { path: 'grafico', component: GraficoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'grafico-barras-apiladas', component: GraficoBarrasApiladasComponent },
  { path: 'sucursales', component: SucursalesListComponent },
  { path: 'grafico-barras', component: GraficoBarrasComponent },
  { path: 'clientes', component: ClientesListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: '**', redirectTo: '/ventas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
