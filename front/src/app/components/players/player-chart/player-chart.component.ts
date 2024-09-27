import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-player-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './player-chart.component.html',
  styleUrl: './player-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerChartComponent implements OnInit {
  //Set tradarChartType: ChartType = 'radar';
  chartLabels: any = input.required();
  chartData: any = input.required();
  playerData = input();
  //Setting the data for the radar graphics

  public config: any = {
    type: 'radar',
    data: {
      labels: [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running',
      ],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 90, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)',
        },
      ],
    },
    options: {
      elements: {
        line: {
          borderWidth: 3,
        },
      },
    },
  };

  public chart: any;

  constructor() {}

  ngOnInit(): void {
    const elementChart = document.getElementById(
      'playerRadar'
    ) as HTMLCanvasElement;
    if (elementChart) {
      this.chart = new Chart(elementChart, this.config).render();
      console.log(JSON.stringify(this.chart));
    }
    console.log(this.chartData);
    console.log(this.chartLabels);
  }
}
