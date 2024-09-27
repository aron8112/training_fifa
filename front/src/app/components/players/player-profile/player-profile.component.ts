import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Players } from '../../../core/interfaces/Iplayers';
import { PlayerService } from '../../../core/services/player-service.service';
import { Observable, pipe, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PlayerChartComponent } from '../player-chart/player-chart.component';
import { InternalServerErrorComponent } from '../../utils/internal-server-error/internal-server-error.component';

@Component({
  selector: 'app-player-profile',
  standalone: true,
  imports: [AsyncPipe, PlayerChartComponent, InternalServerErrorComponent],
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerProfileComponent implements OnInit {
  private playerApiCall = inject(PlayerService);
  private id = 1;
  player$: Observable<Players> = this.getPlayerById(this.id);
  toShow: any;
  //valores a pasar para el gráfico
  labels: string[] = [];
  data: any[] = [];

  //Errores
  errorBool: Boolean = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (data) => {
        let { params } = data as any;
        // console.log(`params in player profile: ${params.id}`);
        // debugger;
        this.id = params.id;
        console.log(this.id);
      },
      error: (error) => {
        this.errorBool = true;
        this.errorMessage = error;
      },
      complete: () => console.log('complete'),
    });
  }

  getPlayerById(id: number): any {
    this.playerApiCall.getPlayerById(id).subscribe({
      next: (response: Players) => {
        const selectedKeys = [
          'pace',
          'shooting',
          'passing',
          'dribbling',
          'defending',
          'physics',
        ];
        this.toShow = response;
        Object.entries(response).forEach(([key, values]) => {
          if (selectedKeys.includes(key)) {
            this.data.push(values);
            this.labels.push(key);
          }
        });
        // console.log(this.data);
        // console.log(this.labels);
      },
      error: (error) => console.log(error),
      complete: () => console.log('Complete'),
    });
  }
}

//
// console.log(this.player$);
// this.player$ = this.playerApiCall.getPlayerById(this.id);
// this.setPlayerInfo();
// console.log(this.player$);
