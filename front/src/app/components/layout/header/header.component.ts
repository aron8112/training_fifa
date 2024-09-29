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
    let getToken = localStorage.getItem('token');
    if (getToken) {
      let payload = JSON.parse(atob(getToken.split('.')[1]));
      this.user = payload.name;
      // console.log(payload);
      this.isLoggedIn = true;
    }
    console.log(this.authService.getToken());
  }

  getUserData(userData: Event) {
    console.log(userData);
    this.isLoggedIn = true;
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    window.location.reload();
  }
}
