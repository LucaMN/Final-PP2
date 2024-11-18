import { Component, OnInit } from '@angular/core';
import { GraficoService } from '../services/grafico.service';
import { Chart, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend, LineController, CategoryScale } from 'chart.js';

// Registrar los componentes necesarios
Chart.register(LinearScale, PointElement, LineElement, Filler, Tooltip, Legend, LineController, CategoryScale);

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  datos: any[] = [];
  chart: Chart | null = null;
  
  // Array de colores predefinidos
  private coloresFijos: string[] = [
    '#FF6384', // rosa
    '#36A2EB', // azul
    '#FFCE56', // amarillo
    '#4BC0C0', // turquesa
    '#9966FF', // morado
    '#FF9F40', // naranja
    '#33CC99', // verde agua
    '#FF6B6B', // coral
    '#7986CB', // azul índigo
    '#4DB6AC', // verde menta
    '#FFA726', // naranja claro
    '#BA68C8', // morado claro
    '#81C784', // verde claro
    '#64B5F6', // azul claro
    '#FFB74D'  // ámbar
  ];

  constructor(private graficoService: GraficoService) { }

  ngOnInit(): void {
    this.graficoService.getData().subscribe(data => {
      this.datos = data;
      console.log('Datos:', this.datos);
      this.crearGrafico();
    });
  }

  crearGrafico(): void {
    const agrupados: { [key: string]: number[] } = {};
    const labels: string[] = [];

    this.datos.forEach(d => {
      const sucursalKey = d.nombre_sucursal;
      const mesLabel = d.nombre_mes;

      if (!labels.includes(mesLabel)) {
        labels.push(mesLabel);
      }

      if (!agrupados[sucursalKey]) {
        agrupados[sucursalKey] = Array(labels.length).fill(0);
      }

      const mesIndex = labels.indexOf(mesLabel);
      agrupados[sucursalKey][mesIndex] = parseFloat(d.monto);
    });

    console.log(labels);
    console.log(agrupados);

    // Obtener un array de todas las sucursales
    const sucursales = Object.keys(agrupados);

    const datasets = sucursales.map((sucursal, index) => ({
      label: sucursal,
      data: agrupados[sucursal],
      fill: false,
      borderColor: this.coloresFijos[index % this.coloresFijos.length], 
      tension: 0.1,
      pointRadius: 5,
      borderWidth: 2
    }));

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('GraficoLinea', {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            position: 'bottom'
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}