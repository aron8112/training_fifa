import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
} from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Players } from '../../../core/interfaces/Iplayers';

@Component({
  selector: 'app-players-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './players-card.component.html',
  styleUrl: './players-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersCardComponent {
  players = input.required<Players>();
  playerInfo = input<Players>();
  // loaded = output<string>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // this.loaded.emit(this.players().player_face_url);
  }

  goToProfile(id: any) {
    console.log(typeof id);
    this.router.navigate(['/profile'], {
      queryParams: { id: id },
      queryParamsHandling: 'merge',
    });
  }
}
