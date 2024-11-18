// src/app/services/grafico.service.ts
// Este servicio se encarga de obtener los datos necesarios para generar gráficos en la aplicación.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {
  // URL del endpoint en el backend para obtener los datos del gráfico
  private apiUrl = 'http://localhost/pp2-Backend/get_data_grafico.php'; 

  // Inyecta el servicio HttpClient para hacer solicitudes HTTP al backend
  constructor(private http: HttpClient) { }

  // Método que realiza una solicitud GET a `apiUrl` para obtener los datos del gráfico
  getData(): Observable<any[]> {
        // Realiza una solicitud HTTP GET a la URL especificada y retorna un Observable que emite un array de cualquier tipo de objeto

    return this.http.get<any[]>(this.apiUrl);
  }
}
 