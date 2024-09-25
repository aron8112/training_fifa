import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-internal-server-error',
  standalone: true,
  imports: [],
  templateUrl: './internal-server-error.component.html',
  styleUrl: './internal-server-error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternalServerErrorComponent {
  error = input();
}
