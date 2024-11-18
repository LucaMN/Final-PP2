import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-ventas-edit',
  templateUrl: './ventas-edit.component.html',
  styleUrls: ['./ventas-edit.component.css']
})
export class VentasEditComponent implements OnInit {
  id_sucursal: number | null = null;
  id_mes: number | null = null;
  monto: number | null = null;
  mensaje: string = '';
  
  ventas: any[] = []; // Para almacenar las ventas de las sucursales
  sucursales: string[] = []; // Para almacenar las sucursales encontradas
  meses: string[] = []; // Para almacenar los meses encontrados
  dataTable: any = {}; // Objeto para almacenar los datos procesados por sucursal y mes
  sucursalValida: boolean = true; // Indicador de si la sucursal es válida
  @ViewChild('mensajeModal') mensajeModal!: ElementRef;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarVentas(); // Cargar las ventas al inicializar el componente
  }
  

  // Método para obtener las ventas
  cargarVentas(): void {
    this.apiService.getVentas().subscribe(
      (response) => {
        console.log(response);
        if (response && Array.isArray(response)) {
          this.ventas = response;
          this.processData();
        } else {
          this.mensaje = 'Error al obtener los datos de las ventas.';
          const modal = new bootstrap.Modal(this.mensajeModal.nativeElement);
          modal.show();
        }
      },
      (error) => {
        console.error(error);
        this.mensaje = 'Error al obtener las ventas.';
        const modal = new bootstrap.Modal(this.mensajeModal.nativeElement);
        modal.show();
      }
    );
  }

  // Método para procesar los datos de ventas y organizarlos por sucursal y mes
  processData(): void {
    this.ventas.forEach(venta => {
      if (!this.sucursales.includes(venta.sucursal)) {
        this.sucursales.push(venta.sucursal);
      }
      if (!this.meses.includes(venta.mes)) {
        this.meses.push(venta.mes);
      }
      if (!this.dataTable[venta.sucursal]) {
        this.dataTable[venta.sucursal] = {};
      }
      this.dataTable[venta.sucursal][venta.mes] = venta.monto;
    });
  }

  // Método para actualizar el monto
  actualizarMonto(): void {
    if (this.sucursalValida) {
      if (this.id_sucursal && this.id_mes && this.monto) {
        this.apiService.updateVenta(this.id_sucursal, this.id_mes, this.monto).subscribe(
          (response) => {
            console.log(response);
            this.mensaje = response.success ? 'Monto actualizado correctamente' : 'Error al actualizar';
            const modal = new bootstrap.Modal(this.mensajeModal.nativeElement);
            modal.show();
            this.cargarVentas(); 
          },
          (error) => {
            console.error(error);
            this.mensaje = 'Error al actualizar';
            const modal = new bootstrap.Modal(this.mensajeModal.nativeElement);
            modal.show();
          }
        );
      } else {
        this.mensaje = 'Completa todos los campos';
        const modal = new bootstrap.Modal(this.mensajeModal.nativeElement);
        modal.show();
      }
    } else {
      this.mensaje = 'La sucursal no es válida.';
      const modal = new bootstrap.Modal(this.mensajeModal.nativeElement);
      modal.show();
    }
  }
  
   
}
