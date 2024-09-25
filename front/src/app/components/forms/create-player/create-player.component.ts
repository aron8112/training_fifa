import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create-player',
  standalone: true,
  imports: [],
  templateUrl: './create-player.component.html',
  styleUrl: './create-player.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePlayerComponent {

}
