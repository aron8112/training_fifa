import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from '../../../core/interfaces/Ialerts';
@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [NgbAlertModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsComponent {
  alert: Alert | {} = input();

  constructor() {}
}
