import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { ActivatedRoute, Router } from '@angular/router';
import { Alert, typeEnum } from '../../../core/interfaces/Ialerts';
import { Players } from '../../../core/interfaces/Iplayers';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../utils/loading/loading.component';

@Component({
  selector: 'app-update-player',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingComponent],
  templateUrl: './update-player.component.html',
  styleUrl: './update-player.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePlayerComponent implements OnInit {
  //set Player data
  id!: number;
  playerApiCall: PlayerService = inject(PlayerService);
  player!: Players;
  lookForAPlayer: boolean = true;
  lookForUpdateForm: FormGroup;

  //Create form
  hasQueryParams: Boolean = false;
  updatePlayerForm: FormGroup;

  //Errores?
  errorBool: Boolean = false;
  errorMessage!: string;

  //Loading
  isLoading: Boolean = false;
  alertMessage: Alert = {
    type: typeEnum.success,
    message: '',
    isActivated: false,
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.updatePlayerForm = this.fb.group({
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
    this.lookForUpdateForm = this.fb.group({
      id: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.id = parseInt(id);
        this.lookForAPlayer = false;
        this.hasQueryParams = true;
        this.updateWithId(parseInt(id));
      }
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

  updateWithId(id: number) {
    this.playerApiCall.getPlayerById(id).subscribe({
      next: (data) => {
        this.player = data;
        this.isLoading = true;
        setTimeout(() => {
          this.updatePlayerForm.patchValue({
            long_name: this.player.long_name,
            fifa_version: this.player.fifa_version,
            fifa_update: this.player.fifa_update,
            player_positions: this.player.player_positions,
            player_face_url: this.player.player_face_url,
            overall: this.player.overall,
            potential: this.player.potential,
            age: this.player.age,
            club_name: this.player.club_name,
            nationality_name: this.player.nationality_name,
            value_eur: this.player.value_eur,
            wage_eur: this.player.wage_eur,
          }),
            2500;
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorBool = true;
        this.errorMessage = error;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onSubmit() {
    let body = {
      user: 'pepe',
      newPlayer: this.removeNullValues(this.updatePlayerForm.value),
      isNew: false,
    };
    // console.log(body);
    this.playerApiCall.updatePlayer(body, this.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => console.log(error),
      complete: () => {
        this.alertMessage.isActivated = true;
        this.cd.detectChanges();
        console.log('Query completed');
      },
    });
  }

  reload() {
    window.location.reload();
  }

  playerSearchToUpdate() {
    let { id } = this.lookForUpdateForm.value;
    this.id = id;
    this.updateWithId(id);

    this.lookForAPlayer = false;
    this.hasQueryParams = true;
  }

  goToProfile(url: string) {
    this.router.navigate([`/players/${url}`], {
      queryParams: { id: this.id },
      queryParamsHandling: 'merge',
    });
  }
}
