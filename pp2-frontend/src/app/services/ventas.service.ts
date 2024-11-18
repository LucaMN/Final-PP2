// src/app/services/ventas.service.ts
// Este servicio permite obtener los datos de ventas desde el backend mediante una solicitud HTTP.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'// Proporciona este servicio a toda la aplicación
})
export class VentasService {
    // URL del endpoint en el backend para obtener datos de la tabla 'ventas'
  private apiUrl = 'http://localhost/pp2-Backend/get_data.php?table=ventas';

  // Inyecta el servicio HttpClient para hacer solicitudes HTTP
  constructor(private http: HttpClient) {}

  // Método para obtener los datos de ventas desde el backend
  getVentas(): Observable<any[]> {
     // Realiza una solicitud GET a la URL especificada y devuelve un Observable de tipo array de cualquier objeto
    return this.http.get<any[]>(this.apiUrl);
  }
}
