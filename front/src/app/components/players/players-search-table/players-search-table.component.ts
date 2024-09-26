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
@Component({
  selector: 'app-players-search-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './players-search-table.component.html',
  styleUrl: './players-search-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersSearchTableComponent implements OnChanges {
  searchPlayers: null = null;
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
    private zone: NgZone
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.onSubmit();
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

  previousPage() {
    this.page -= 1;
    this.queryParams.page = this.page;
    this.playerApiCall.searchFilteredPlayers(this.queryParams).subscribe({
      next: (data) => {
        this.zone.run(() => {
          // Asegura que la actualización ocurra dentro del ciclo de cambio de Angular
          this.players = data;
          this.cd.detectChanges(); // Asegúrate de que los cambios se reflejen
        });
        console.log(data);
      },
      error: (error) => console.log(error),
      complete: () => {
        this.cd.detectChanges();
        console.log('Query completed');
      },
    });
  }

  nextPage() {
    this.page += 1;
    this.queryParams.page = this.page;
    this.players = [];
    this.cd.detectChanges();
    this.playerApiCall.searchFilteredPlayers(this.queryParams).subscribe({
      next: (data) => {
        this.zone.run(() => {
          // Asegura que la actualización ocurra dentro del ciclo de cambio de Angular
          this.players = data;
          // Asegúrate de que los cambios se reflejen
        });
        console.log(data);
      },
      error: (error) => console.log(error),
      complete: () => {
        this.isTableSet = true;
        this.cd.detectChanges();
        console.log('Query completed');
      },
    });
  }

  onSubmit() {
    this.queryParams.column = this.searchForm.value.searchFilter;
    this.queryParams.search = this.searchForm.value.searchBy;
    this.queryParams.exact = this.searchForm.value.searchExact;
    this.queryParams.page;
    let params = this.queryParams;
    this.playerApiCall.searchFilteredPlayers(params).subscribe({
      next: (data) => {
        console.log(data);
        this.searchPlayers = data;
      },
      error: (error) => console.log(error),
      complete: () => {
        this.cd.detectChanges();
        console.log('Query completed');
      },
    });
  }
}
// this.getPlayers().subscribe({
//   next: (data) => {
//     console.log(data);
//     this.players = data;
//   },
//   error: (error) => console.log(error),
//   complete: () => {
//     this.isTableSet = true;
//     console.log('Query completed');
//   },
// });
