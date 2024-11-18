// clientes-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {
  clientes: any[] = [];  // Define  "clientes", que será un arreglo donde se almacenarán los datos de los clientes

  constructor(private http: HttpClient) {}
 // Método que se ejecuta cuando el componente se inicializa
  ngOnInit() {
    // Llama al servidor backend para obtener los datos de los clientes desde la API (endpoint especificado)
    this.http.get('http://localhost/pp2-Backend/get_data.php?table=clientes').subscribe(
      (data: any) => {// Si la petición es exitosa, el servidor devuelve los datos
        this.clientes = data;// Asigna los datos recibidos a la propiedad "clientes"
      },
      (error) => {
        console.error('Error fetching clientes:', error);
      }
    );
  }
}
