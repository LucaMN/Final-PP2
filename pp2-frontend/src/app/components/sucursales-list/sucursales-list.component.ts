import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sucursales-list',
  templateUrl: './sucursales-list.component.html',
  styleUrls: ['./sucursales-list.component.css']
})
export class SucursalesListComponent implements OnInit {
  sucursales: any[] = [];// Array que almacenará las sucursales obtenidas de la API.
  error: string | null = null; // Variable para almacenar un mensaje de error si algo sale mal.


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSucursales();// Llama al método fetchSucursales cuando el componente se inicializa.
  }

  // Método para obtener las sucursales desde la API
  fetchSucursales() {
     // Realiza una petición GET a la URL proporcionada
    this.http.get<any[]>('http://localhost/pp2-Backend/get_data.php?table=sucursales').subscribe(
      // Si la petición es exitosa, se ejecuta este bloque de código.
      (data) => {
        this.sucursales = data;// Los datos recibidos se asignan al array 'sucursales'.
      },
      // Si hay un error en la petición, se ejecuta este bloque.
      (err) => {
        this.error = 'Error al cargar las sucursales';// Establece un mensaje de error.
        console.error(err);
      }
    );
  }
}
