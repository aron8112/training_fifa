import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { PlayerService } from '../../../core/services/player-service.service';
import { Observable } from 'rxjs';
import { Players } from '../../../core/interfaces/Iplayers';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoadingComponent } from '../../utils/loading/loading.component';
import { Router } from '@angular/router';
Chart.register(...registerables);

@Component({
  selector: 'app-player-chart',
  standalone: true,
  imports: [BaseChartDirective, AsyncPipe, LoadingComponent, CommonModule],
  templateUrl: './player-chart.component.html',
  styleUrl: './player-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerChartComponent implements OnInit {
  //Set tradarChartType: ChartType = 'radar';
  id: any = input.required<Number>();
  player!: Players;
  isLoading = true;

  //Setting the data for the radar graphics

  public config: any = {
    type: 'radar',
    data: {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
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
  public chart2: any;
  playerApiCall = inject(PlayerService);

  constructor(private router: Router, private cd: ChangeDetectorRef) {
    effect(() => {
      parseInt(this.id());
    });
  }

  ngOnInit(): void {
    this.createDataChart(this.id());
  }

  createDataChart(id: number) {
    this.playerApiCall.getPlayerById(id).subscribe((response) => {
      this.player = response;
      // console.log(this.player);
    });
    setTimeout(() => {
      return this.setStats();
    }, 800);
    setTimeout(() => {
      const elementChart = document.getElementById(
        'playerRadar'
      ) as HTMLCanvasElement;
      this.isLoading = false;
      if (elementChart) {
        this.chart = new Chart(elementChart, this.config).render();
        this.cd.markForCheck();
      }
    }, 1500);
  }

  setStats() {
    const selectedKeys = [
      'pace',
      'shooting',
      'passing',
      'dribbling',
      'defending',
      'physic',
    ];

    Object.entries(this.player).forEach(([key, values]) => {
      if (selectedKeys.includes(key)) {
        // console.log(key);
        // console.log(values);
        this.config.data.datasets[0].data.push(values);
        this.config.data.labels.push(key);
      }
      // console.log(this.config.data.datasets[0].data);
    });
    this.config.data.datasets[0].label = `Versión FIFA ${this.player.fifa_version}`;
  }

  goToProfile(command: boolean) {
    let idInt = parseInt(this.id());
    this.router
      .navigate(['/players/profile'], {
        queryParams: { id: command ? idInt + 1 : idInt - 1 },
        queryParamsHandling: 'merge',
      })
      .then(() => {
        window.location.reload();
        this.createDataChart(idInt);
      });
    this.cd.markForCheck();
  }

  compareData() {
    document.getElementById('playerRadar')?.remove();
    const newFakeDatasets = [
      {
        label: 'Versión FIFA: 15',
        data: [60, 78, 71, 88, 34, 55],
        fill: true,
        backgroundColor: 'rgba(200, 99, 132, 0.2)',
        borderColor: 'rgb(200, 99, 132)',
        pointBackgroundColor: 'rgb(200, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(200, 99, 132)',
      },
      {
        label: 'Versión FIFA: 16',
        data: [20, 78, 55, 88, 34, 85],
        fill: true,
        backgroundColor: 'rgba(200, 150, 132, 0.2)',
        borderColor: 'rgb(200, 150, 132)',
        pointBackgroundColor: 'rgb(200, 150, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(200, 150, 132)',
      },
      {
        label: 'Versión FIFA: 17',
        data: [40, 70, 69, 88, 64, 55],
        fill: true,
        backgroundColor: 'rgba(200, 99, 200, 0.2)',
        borderColor: 'rgb(200, 99, 200)',
        pointBackgroundColor: 'rgb(200, 99, 200)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(200, 99, 200)',
      },
      {
        label: 'Versión FIFA: 18',
        data: [20, 50, 49, 88, 84, 45],
        fill: true,
        backgroundColor: 'rgba(200, 150, 90, 0.2)',
        borderColor: 'rgb(200, 150, 90)',
        pointBackgroundColor: 'rgb(200, 150, 90)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(200, 150, 90)',
      },
      {
        label: 'Versión FIFA: 19',
        data: [20, 50, 49, 88, 84, 45],
        fill: true,
        backgroundColor: 'rgba(185, 150, 90, 0.2)',
        borderColor: 'rgb(185, 150, 90)',
        pointBackgroundColor: 'rgb(185, 150, 90)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(185, 150, 90)',
      },
      {
        label: 'Versión FIFA: 20',
        data: [20, 50, 49, 88, 84, 45],
        fill: true,
        backgroundColor: 'rgba(185, 150, 90, 0.2)',
        borderColor: 'rgb(185, 150, 90)',
        pointBackgroundColor: 'rgb(185, 150, 90)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(185, 150, 90)',
      },
      {
        label: 'Versión FIFA: 21',
        data: [20, 50, 49, 88, 84, 45],
        fill: true,
        backgroundColor: 'rgba(185, 150, 90, 0.2)',
        borderColor: 'rgb(185, 150, 90)',
        pointBackgroundColor: 'rgb(185, 150, 90)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(185, 150, 90)',
      },
      {
        label: 'Versión FIFA: 22',
        data: [60, 50, 60, 70, 90, 65],
        fill: true,
        backgroundColor: 'rgba(185, 200, 90, 0.2)',
        borderColor: 'rgb(185, 200, 90)',
        pointBackgroundColor: 'rgb(185, 200, 90)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(185, 200, 90)',
      },
      {
        label: 'Versión FIFA: 23',
        data: [30, 40, 59, 78, 64, 55],
        fill: true,
        backgroundColor: 'rgba(185, 150, 100, 0.2)',
        borderColor: 'rgb(185, 150, 100)',
        pointBackgroundColor: 'rgb(185, 150, 100)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(185, 150, 100)',
      },
    ];
    this.isLoading = true;
    this.config.labels = [
      'pace',
      'shooting',
      'passing',
      'dribbling',
      'defending',
      'physic',
    ];
    this.config.datasets = newFakeDatasets;
    setTimeout(() => {
      this.isLoading = false;
      let elementChart = document.getElementById(
        'playerRadar2'
      ) as HTMLCanvasElement;
      if (elementChart) {
        this.chart = new Chart(elementChart, this.config).render();
        this.cd.markForCheck();
      }
    }, 1500);
  }
}
