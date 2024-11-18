import { Component, OnInit } from '@angular/core';
import { GraficoService } from '../services/grafico.service';
import { Chart, LinearScale, BarElement, CategoryScale, Tooltip, Legend, BarController } from 'chart.js';

// Registrar los componentes necesarios para el gráfico de barras
Chart.register(LinearScale, BarElement, CategoryScale, Tooltip, Legend, BarController);

@Component({
  selector: 'app-grafico-barras-apiladas',
  templateUrl: './grafico-barras-apiladas.component.html',
  styleUrls: ['./grafico-barras-apiladas.component.css']
})
export class GraficoBarrasApiladasComponent implements OnInit {
  datos: any[] = [];
  chart: Chart | null = null;

  // Array de colores predefinidos para mantener consistencia con los otros gráficos
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

  // Array de colores semitransparentes para un mejor efecto visual en las barras apiladas
  private coloresSemiTransparentes: string[] = [
    'rgba(255, 99, 132, 0.8)',  // rosa
    'rgba(54, 162, 235, 0.8)',  // azul
    'rgba(255, 206, 86, 0.8)',  // amarillo
    'rgba(75, 192, 192, 0.8)',  // turquesa
    'rgba(153, 102, 255, 0.8)', // morado
    'rgba(255, 159, 64, 0.8)',  // naranja
    'rgba(51, 204, 153, 0.8)',  // verde agua
    'rgba(255, 107, 107, 0.8)', // coral
    'rgba(121, 134, 203, 0.8)', // azul índigo
    'rgba(77, 182, 172, 0.8)',  // verde menta
    'rgba(255, 167, 38, 0.8)',  // naranja claro
    'rgba(186, 104, 200, 0.8)', // morado claro
    'rgba(129, 199, 132, 0.8)', // verde claro
    'rgba(100, 181, 246, 0.8)', // azul claro
    'rgba(255, 183, 77, 0.8)'   // ámbar
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
      backgroundColor: this.coloresSemiTransparentes[index % this.coloresSemiTransparentes.length],
      borderColor: this.coloresFijos[index % this.coloresFijos.length],
      borderWidth: 1
    }));

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('GraficoBarrasApiladas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            beginAtZero: true,
            stacked: true
          }
        }
      }
    });
  }
}