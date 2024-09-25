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
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Observable } from 'rxjs';
import { PlayerService } from '../../../core/services/player-service.service';

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
  labels: any = input.required();
  values: any = input.required();

  //Setting the data for the radar graphics
  public radarChartOptions: ChartConfiguration['options'] = {};
  public radarChartLabels: string[] = [];
  public radarChartType: ChartType = 'radar';
  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [{ data: [] }],
  };
  data: any;

  constructor() {}

  ngOnInit(): void {
    this.radarChartLabels = this.labels;
    this.radarChartData.datasets[0].data = this.values;
  }
}
