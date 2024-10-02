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
  downloadcsv(lib: string): void {
    let url;
    let fileName: string;
    if (lib === 'xlsx') {
      url = 'docs/download';
      fileName = 'fifa_players2024_xlsx.csv';
    } else if (lib === 'fs') {
      url = 'docs/download2';
      fileName = 'fifa_players2024_fs.csv';
    }
    this.apiService.getCSV(url as string).subscribe((response) => {
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }
}
