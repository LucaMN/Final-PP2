import { Component, OnInit } from '@angular/core';
import { GraficoService } from '../services/grafico.service';
import { Chart, LinearScale, BarElement, Tooltip, Legend, BarController, CategoryScale } from 'chart.js';

// Registrar los componentes necesarios para el gráfico de barras
Chart.register(LinearScale, BarElement, Tooltip, Legend, BarController, CategoryScale);

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent implements OnInit {
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

  // Array de colores más claros para el borde
  private coloresBorde: string[] = [
    '#FF7394', // rosa más claro
    '#46B2FB', // azul más claro
    '#FFDE66', // amarillo más claro
    '#5BD0D0', // turquesa más claro
    '#A976FF', // morado más claro
    '#FFAF50', // naranja más claro
    '#43DCA9', // verde agua más claro
    '#FF7B7B', // coral más claro
    '#8996DB', // azul índigo más claro
    '#5DC6BC', // verde menta más claro
    '#FFB736', // naranja claro más claro
    '#CA78D8', // morado claro más claro
    '#91D794', // verde claro más claro
    '#74C5FF', // azul claro más claro
    '#FFC75D'  // ámbar más claro
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
      backgroundColor: this.coloresFijos[index % this.coloresFijos.length],
      borderColor: this.coloresBorde[index % this.coloresBorde.length],
      borderWidth: 1
    }));

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('graficoBarras', {
      type: 'bar',
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