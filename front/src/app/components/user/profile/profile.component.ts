import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { JWTTokenService } from '../../../core/services/jwt-auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  jwtService = inject(JWTTokenService);
  name!: string;
  email!: string;

  ngOnInit(): void {
    this.setUserData();
  }

  setUserData() {
    this.name = this.jwtService.getName();
    this.email = this.jwtService.getEmail();
  }
}
