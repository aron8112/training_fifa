import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FieldToFilterSearch,
  Players,
} from '../../../core/interfaces/Iplayers';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PlayerService } from '../../../core/services/player-service.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-players-search-table',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './players-search-table.component.html',
  styleUrl: './players-search-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersSearchTableComponent {
  searchPlayers: null = null;
  playerApiService: PlayerService = inject(PlayerService);
  optionSelect = FieldToFilterSearch;
  searchForm: FormGroup = new FormGroup({
    searchFilter: new FormControl(''),
    searchBy: new FormControl(''),
    searchExact: new FormControl(''),
  });
  isTableSet: Boolean = false;
  queryParams = {
    column: '',
    search: '',
    exact: Boolean,
    page: 1,
  };
  //Errores?
  errorBool: Boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //Validadores
    this.searchForm = this.fb.group({
      searchFilter: ['', [Validators.required]],
      searchBy: ['', [Validators.required]],
      searchExact: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.queryParams.column = this.searchForm.value.searchFilter;
    this.queryParams.search = this.searchForm.value.searchBy;
    this.queryParams.exact = this.searchForm.value.searchExact;
    this.queryParams.page;
    let params = this.queryParams;
    this.playerApiService.searchFilteredPlayers(params).subscribe({
      next: (data) => {
        console.log(data);
        this.searchPlayers = data;
      },
      error: (error) => console.log(error),
      complete: () => {
        this.isTableSet = true;
        console.log('Query completed');
      },
    });
  }
}
