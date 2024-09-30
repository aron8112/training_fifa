import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  output,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PlayerService } from '../../../core/services/player-service.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../utils/loading/loading.component';
import { AlertsComponent } from '../../utils/alerts/alerts.component';
import { Alert, typeEnum } from '../../../core/interfaces/Ialerts';

@Component({
  selector: 'app-create-player',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingComponent,
    CommonModule,
    AlertsComponent,
  ],
  templateUrl: './create-player.component.html',
  styleUrl: './create-player.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlayerComponent {
  playerApiService: PlayerService = inject(PlayerService);
  newPlayerForm: FormGroup = new FormGroup({
    long_name: new FormControl(null, [Validators.required]),
    fifa_version: new FormControl(null, [Validators.required]),
    fifa_update: new FormControl(null, [Validators.required]),
    player_positions: new FormControl(null, [Validators.required]),
    player_face_url: new FormControl(null, [Validators.required]),
    overall: new FormControl(null, [Validators.required]),
    potential: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
    club_name: new FormControl(null),
    nationality_name: new FormControl(null),
    value_eur: new FormControl(null),
    wage_eur: new FormControl(null),
  });

  //Errores?
  errorBool: Boolean = false;
  errorMessage: string = '';

  //Loading
  isLoading: Boolean = false;
  alertMessage: Alert = {
    type: typeEnum.success,
    message: '',
    isActivated: false,
  };

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onSubmit() {
    let body = {
      user: 'pepe',
      newPlayer: this.removeNullValues(this.newPlayerForm.value),
      isNew: true,
    };
    console.log(body);
    // this.playerApiService.createNewPlayer(body);
    this.playerApiService.createNewPlayer(body).subscribe({
      next: (data: any) => {
        if (data.status === 'Created') {
          this.isLoading = true;
        }
      },
      error: (error) => console.log(error),
      complete: () => {
        setTimeout(() => {
          console.log('Query completed');
          this.alertMessage.isActivated = true;
          this.alertMessage.message = 'Nuevo jugador creado exitosamente!';
          this.isLoading = false;
          this.cd.detectChanges();
        }, 1500);
      },
    });
  }

  removeNullValues(obj: any) {
    // console.log('obj', obj);
    Object.entries(obj).forEach(([key, value]) => {
      if (value === null) {
        delete obj[key];
      }
    });
    return obj;
  }

  reload() {
    window.location.reload();
  }
}
