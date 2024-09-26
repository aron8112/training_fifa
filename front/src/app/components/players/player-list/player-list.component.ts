import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PlayerService } from '../../../core/services/player-service.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Players } from '../../../core/interfaces/Iplayers';
import { PlayersCardComponent } from '../players-card/players-card.component';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [AsyncPipe, PlayersCardComponent],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerListComponent {
  private playerApiCall = inject(PlayerService);
  players$: Observable<Players[]> = this.playerApiCall.getPlayers();
  playerInfo: Record<string, Players> = {};
  page: number = 1;

  getPlayers(): Observable<Players[]> {
    return this.playerApiCall.getPlayers();
  }

  previousPage(): Observable<Players[]> {
    this.page -= 1;
    return (this.players$ = this.playerApiCall.getPlayersPages(this.page));
  }

  nextPage(): Observable<Players[]> {
    this.page += 1;
    return (this.players$ = this.playerApiCall.getPlayersPages(this.page));
  }
}
