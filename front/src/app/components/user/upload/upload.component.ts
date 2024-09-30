import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api-service.service';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent {
  currentFile?: File;
  message = '';
  fileInfos?: Observable<any>;
  response: any;
  headers: string[] = [];
  dataValues: string[] = [];
  apiService = inject(ApiService);

  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);
  }

  upload(): void {
    if (this.currentFile) {
      this.apiService.uploadCSV(this.currentFile).subscribe({
        next: (data) => {
          this.response = data;
        },
        error: (error) => {
          this.message = error;
        },
        complete: () => {
          const selectedKeys = [
            'long_name',
            'club_name',
            'league_name',
            'pace',
            'shooting',
            'passing',
            'dribbling',
            'defending',
            'physic',
          ];
          this.headers = selectedKeys;

          this.response.parsedInfo.forEach((player: any) => {
            const playerData: any = selectedKeys.map((key) => player[key]);
            this.dataValues.push(playerData);
          });
        },
      });
    }
  }
}
