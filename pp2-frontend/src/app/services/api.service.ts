// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost/pp2-Backend'; // Cambia esto si es necesario

  constructor(private http: HttpClient) {}

  // Método para obtener las ventas con sucursales y meses
  getVentas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_data.php?table=ventas`);
  }
  getSucursales(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_data.php?action=getSucursales`);
  }
  
  getVentasPorSucursal(sucursal: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_data.php?action=getVentasPorSucursal&sucursal=${sucursal}`);
  }
  

  updateVenta(id_sucursal: number, id_mes: number, monto: number): Observable<any> {
    const body = {
      table: 'ventas',
      data: {
        id_sucursal: id_sucursal,
        id_mes: id_mes,
        monto: monto
      }
    };
    
    // Asegúrate de incluir el Content-Type
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    
    return this.http.post(`${this.baseUrl}/update_data.php`, JSON.stringify(body), { headers });
  }
}
