import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api-service.service';
import { response } from 'express';

@Component({
  selector: 'app-player-main',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './player-main.component.html',
  styleUrl: './player-main.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerMainComponent {
  apiService: ApiService = inject(ApiService);
  downloadcsv(): void {
    this.apiService.getCSV('docs/download').subscribe((response) => {
      let fileName: any = response.headers
        .get('content-disposition')
        ?.split(';')[1]
        .split('=')[1];
      // let fileName = 'fifa_players2024.csv';
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }

  downloadcsvWithFS(): void {
    this.apiService.getCSV('docs/download2').subscribe((response) => {
      let fileName: any = response.headers
        .get('content-disposition')
        ?.split(';')[1]
        .split('=')[1];
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }
}
