import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Players } from '../../../core/interfaces/Iplayers';
import { PlayerService } from '../../../core/services/player-service.service';
import { Observable, pipe } from 'rxjs';
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
  private id: number = 0;
  // player$: Observable<Players> | null = null;

  //valores a pasar para el gráfico
  labels: string[] = [];
  values: any[] = [];

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
      },
      error: (error) => {
        this.errorBool = true;
        this.errorMessage = error;
      },
      // , complete: () => (this.player$ = this.getPlayerById(this.id)),
    });
    // this.player$ = this.playerApiCall.getPlayerById(this.id);
    // this.setPlayerInfo();
    // console.log(this.player$);
  }

  getPlayerById(id: number) {
    return this.playerApiCall.getPlayerById(id).pipe();
  }
}
