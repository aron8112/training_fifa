import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  goToProfile(id: any) {
    // console.log(typeof id);
    this.router.navigate(['/players/profile'], {
      queryParams: { id: id },
      queryParamsHandling: 'merge',
    });
  }
}
