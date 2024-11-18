import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ventas-list',
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css']
})
export class VentasListComponent implements OnInit {
   // Variables para almacenar los datos de ventas, sucursales, meses y la tabla de datos
  ventas: any[] = []; // Array para almacenar las ventas
  sucursales: string[] = [];// Array para almacenar las sucursales encontradas
  meses: string[] = [];// Array para almacenar los meses encontrados
  dataTable: any = {}; // Objeto para almacenar los datos procesados por sucursal y mes


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getVentas(); // Llamamos al método que obtiene las ventas al cargar el componente
  }

  // Método para obtener los datos de ventas desde el servidor
  getVentas(): void {
    // Hacemos una solicitud GET a un endpoint PHP que devuelve los datos de ventas
    this.http.get<any[]>('http://localhost/pp2-Backend/get_data.php?table=ventas')
      .subscribe(data => {
        this.ventas = data; // Asignamos los datos de ventas al array ventas

        // Procesar los datos
        this.processData();
      }, error => {
        console.error('Error al obtener datos:', error);
      });
  }

   // Método para procesar los datos de ventas y organizarlos por sucursal y mes
  processData(): void {
    // Recorremos el array de ventas
    this.ventas.forEach(venta => {
      // Si la sucursal no está en el array de sucursales, la agregamos
      if (!this.sucursales.includes(venta.sucursal)) {
        this.sucursales.push(venta.sucursal);
      }

      // Si el mes no está en el array de meses, lo agregamos
      if (!this.meses.includes(venta.mes)) {
        this.meses.push(venta.mes);
      }

      // Inicializa el objeto para cada sucursal
      if (!this.dataTable[venta.sucursal]) {
        this.dataTable[venta.sucursal] = {};
      }

      // Asigna el monto a la sucursal y mes correspondiente
      this.dataTable[venta.sucursal][venta.mes] = venta.monto;
    });
  }
}
