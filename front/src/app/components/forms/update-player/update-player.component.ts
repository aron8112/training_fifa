import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { PlayerService } from '../../../core/services/player-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-player',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-player.component.html',
  styleUrl: './update-player.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePlayerComponent implements OnInit {
  id!: number;
  playerApiService: PlayerService = inject(PlayerService);
  updatePlayerForm: FormGroup = new FormGroup({
    long_name: new FormControl(null, [Validators.nullValidator]),
    fifa_version: new FormControl(null, [Validators.nullValidator]),
    fifa_update: new FormControl(null, [Validators.nullValidator]),
    player_positions: new FormControl(null, [Validators.nullValidator]),
    player_face_url: new FormControl(null, [Validators.nullValidator]),
    overall: new FormControl(null, [Validators.max(100)]),
    potential: new FormControl(null, [Validators.max(100)]),
    age: new FormControl(null, [Validators.min(17), Validators.max(50)]),
    club_name: new FormControl(null),
    nationality_name: new FormControl(null),
    value_eur: new FormControl(null),
    wage_eur: new FormControl(null),
  });

  //Errores?
  errorBool: Boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (data) => {
        let { params } = data as any;
        // console.log(`params in player profile: ${params.id}`);
        // debugger;
        this.id = params.id;
        console.log(this.id);
      },
      error: (error) => {
        this.errorBool = true;
        this.errorMessage = error;
      },
      complete: () => console.log('complete'),
    });
  }

  removeNullValues(obj: any) {
    console.log('obj', obj);
    Object.entries(obj).forEach(([key, value]) => {
      if (value === null) {
        delete obj[key];
      }
    });
    return obj;
  }

  onSubmit() {
    let body = {
      user: 'pepe',
      newPlayer: this.removeNullValues(this.updatePlayerForm.value),
      isNew: false,
    };
    // console.log(body);
    this.playerApiService.createNewPlayer(body);
    this.playerApiService.updatePlayer(body, this.id).subscribe({
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
