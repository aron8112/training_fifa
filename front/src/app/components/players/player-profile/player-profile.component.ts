import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Players } from '../../../core/interfaces/Iplayers';
import { PlayerService } from '../../../core/services/player-service.service';
import { concat, concatMap, Observable, pipe, switchMap, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { PlayerChartComponent } from '../player-chart/player-chart.component';
import { InternalServerErrorComponent } from '../../utils/internal-server-error/internal-server-error.component';

@Component({
  selector: 'app-player-profile',
  standalone: true,
  imports: [
    AsyncPipe,
    PlayerChartComponent,
    InternalServerErrorComponent,
    JsonPipe,
  ],
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerProfileComponent implements OnInit {
  private playerApiCall = inject(PlayerService);
  id!: number;
  player!: Observable<Players>;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (data) => {
        let { params } = data as any;
        this.id = params.id;
        console.log(this.id);
      },
    });
  }

  getPlayerById() {
    let obs = this.playerApiCall
      .getPlayerById(this.id)
      .subscribe((response) => {
        console.log(response);
        this.player = response;
        console.log(typeof this.player);
      });
  }
}
