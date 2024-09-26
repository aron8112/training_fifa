import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { PlayerService } from '../../../core/services/player-service.service';

@Component({
  selector: 'app-update-player',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-player.component.html',
  styleUrl: './update-player.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePlayerComponent {
  playerApiService: PlayerService = inject(PlayerService);
  updatePlayerForm: FormGroup = new FormGroup({
    long_name: new FormControl('', [Validators.nullValidator]),
    fifa_version: new FormControl('', [Validators.nullValidator]),
    fifa_update: new FormControl('', [Validators.nullValidator]),
    player_positions: new FormControl('', [Validators.nullValidator]),
    player_face_url: new FormControl('', [Validators.nullValidator]),
    overall: new FormControl('', [Validators.max(100)]),
    potential: new FormControl('', [Validators.max(100)]),
    age: new FormControl('', [Validators.min(17), Validators.max(50)]),
    // club_name: new FormControl(null),
    // nationality_name: new FormControl(null),
    // value_eur: new FormControl(null),
    // wage_eur: new FormControl(null),
  });

  //Errores?
  errorBool: Boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    let body = {
      user: 'pepe',
      newPlayer: {
        ...this.updatePlayerForm.value,
      },
      isNew: false,
    };
    console.log(body);
    // this.playerApiService.createNewPlayer(body);
    this.playerApiService.createNewPlayer(body).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log('Query completed');
      },
    });
  }
}
