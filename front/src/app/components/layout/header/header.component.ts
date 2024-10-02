import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { JWTTokenService } from '../../../core/services/jwt-auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgbNavModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  isLoggedIn: Boolean = false;
  user!: string;
  authService = inject(JWTTokenService);

  ngOnInit(): void {
    let getToken = this.authService.getName();
    if (getToken) {
      this.user = getToken;
      this.isLoggedIn = true;
    }
  }

  getUserData(userData: Event) {
    console.log(userData);
    this.isLoggedIn = true;
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    window.location.reload();
  }
}
