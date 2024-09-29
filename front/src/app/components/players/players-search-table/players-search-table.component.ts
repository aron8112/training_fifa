import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  NgZone,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Players } from '../../../core/interfaces/Iplayers';
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
import { Router } from '@angular/router';
@Component({
  selector: 'app-players-search-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './players-search-table.component.html',
  styleUrl: './players-search-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersSearchTableComponent implements OnChanges {
  searchPlayers: any = [];
  playerApiCall: PlayerService = inject(PlayerService);
  // optionSelect = FieldToFilterSearch;
  players: Players[] = [];
  page: number = 1;
  searchForm: FormGroup = new FormGroup({
    searchFilter: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
    ]),
    searchBy: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
    ]),
    searchExact: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
    ]),
  });
  isTableSet: Boolean = false;
  queryParams = {
    column: '',
    search: '',
    exact: false,
    page: 1,
  };
  //Errores?
  errorBool: Boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private zone: NgZone,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.onSubmit();
    // this.movePage(order: boolean)
  }

  ngOnInit(): void {
    //Validadores
    this.searchForm = this.fb.group({
      searchFilter: ['', [Validators.required]],
      searchBy: ['', [Validators.required]],
      searchExact: [''],
    });
  }

  getPlayers(): Observable<Players[]> {
    // return this.playerApiCall.getAll();
    return this.playerApiCall.getPlayers();
  }

  movePage(command: boolean) {
    //Cambio de paǵina
    command ? (this.page += 1) : (this.page -= 1);
    this.queryParams.page = this.page;
    //Volver jugadores un array vacío --> resultado = sin cambios
    this.playerApiCall.searchFilteredPlayers(this.queryParams).subscribe({
      next: (data) => {
        this.searchPlayers = [];
        this.zone.run(() => {
          this.searchPlayers = data;
          console.log(data);
        });
      },
      error: (error) => console.log(error),
      complete: () => {
        this.cd.detectChanges();
        console.log('Query completed');
      },
    });
  }

  trackByPlayerId(index: number, player: any): number {
    return player.id;
  }

  onSubmit() {
    this.queryParams.column = this.searchForm.value.searchFilter;
    this.queryParams.search = this.searchForm.value.searchBy;
    this.queryParams.exact = this.searchForm.value.searchExact;
    this.queryParams.page = 1;
    let params = this.queryParams;
    this.playerApiCall.searchFilteredPlayers(params).subscribe({
      next: (data) => {
        console.log(data);
        this.searchPlayers = data;
        // this.cd.markForCheck();
        // this.cd.detectChanges();
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log('Query completed');
      },
    });
  }

  goToProfile(id: any, url: string) {
    this.router.navigate([`/players/${url}`], {
      queryParams: { id: id },
      queryParamsHandling: 'merge',
    });
  }
}
