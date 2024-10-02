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
  playerApiCall = inject(PlayerService);
  changeChart: boolean = false;
  hideChart: boolean = false;
  changeLineChart: boolean = false;
  hideLineChart: boolean = false;

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
      responsive: true,
      elements: {
        line: {
          borderWidth: 3,
        },
      },
    },
  };

  public chart: any;

  //Gráfico 2 comparativas
  config2: any = {
    type: 'radar',
    data: {},
    options: {
      responsive: true,
      elements: {
        line: {
          borderWidth: 3,
        },
      },
      plugins: {
        tooltip: {
          xAlign: 'right',
          yAlign: 'center',
        },
      },
    },
  };
  public chart2: any;

  //Gráfico 3 Líneas
  config3: any = {
    type: 'line',
    data: {},
  };
  public chart3: any;

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
      this.isLoading = !this.isLoading;
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
    this.isLoading = true;
    this.playerApiCall.getPlayerVersions(this.player.long_name).subscribe({
      next: (response) => {
        this.config2.data = response;
        console.log(response);
      },
      error: (error) => console.log(error),
      complete: () => {
        this.changeChart = true;
        let elementChart = document.getElementById(
          'playerRadar2'
        ) as HTMLCanvasElement;
        if (elementChart) {
          this.chart = new Chart(elementChart, this.config2).render();
        }
        this.cd.markForCheck();
      },
    });
  }

  hideChart2() {
    this.hideChart = !this.hideChart;
  }

  createSkillChart() {
    this.isLoading = true;
    this.playerApiCall
      .getDetailedSkillsPlayer(this.player.long_name)
      .subscribe({
        next: (response) => {
          this.config3.data = response;
          console.log(response);
        },
        error: (error) => console.log(error),
        complete: () => {
          this.changeLineChart = true;
          let elementChart = document.getElementById(
            'playerLineChart'
          ) as HTMLCanvasElement;
          if (elementChart) {
            this.chart3 = new Chart(elementChart, this.config3).render();
          }
          this.cd.markForCheck();
        },
      });
  }

  hideLineChartBttn() {
    this.hideLineChart = !this.hideLineChart;
  }
}
