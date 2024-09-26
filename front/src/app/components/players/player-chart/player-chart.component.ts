import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Players } from '../../../core/interfaces/Iplayers';
import { BaseChartDirective } from 'ng2-charts';
import { JsonPipe } from '@angular/common';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { PlayerService } from '../../../core/services/player-service.service';
import { registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-player-chart',
  standalone: true,
  imports: [BaseChartDirective, JsonPipe],
  templateUrl: './player-chart.component.html',
  styleUrl: './player-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerChartComponent implements OnInit {
  //Set the player Id and get data
  // labels: any = input.required();
  // data: any = input.required();
  // playerData = input();
  //Setting the data for the radar graphics
  public config: any = {
    type: 'radar',
    data: {
      dataset: [
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
        {
          label: 'My Second Dataset',
          data: [28, 48, 40, 19, 96, 27, 100],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)',
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
      'myRadar'
    ) as HTMLCanvasElement;
    if (elementChart) {
      this.chart = new Chart(elementChart, this.config);
    }
  }
}
