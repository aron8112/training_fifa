import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
} from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Alert, typeEnum } from '../../../core/interfaces/Ialerts';
@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [NgbAlertModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsComponent {
  alertType = input.required<typeEnum>();
  alertMessage = input();
  success: string = 'success';

  constructor() {
    effect(() => {
      console.log(typeof this.alertType());
      // .toString();
    });
  }

  reset() {
    window.location.reload();
  }

  setTypeAlert() {
    const ALERTS = [
      'success',
      'info',
      'warning',
      'danger',
      'primary',
      'secondary',
      'light',
      'dark',
    ];
    // if (ALERTS.includes(this.alertType())) {
    // }
  }
}
