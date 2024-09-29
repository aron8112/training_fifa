import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../../core/services/api-service.service';
import { Router } from '@angular/router';
import { JWTTokenService } from '../../../core/services/jwt-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

//
export class LoginComponent {
  //Servicios requeridos
  apiService = inject(ApiService);
  jwtService = inject(JWTTokenService);
  //Construcción de formulario
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  //Errores?
  errorBool: Boolean = false;
  errorMessage: string = '';
  //Output = comunicar que se registró exitosamente el usuario
  userLoggedIn = output<string>();

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    //Validadores
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onSubmit() {
    //Eliminar token anteriores si los hubiera, particularmente para este momento
    // de desarrollo
    localStorage.removeItem('auth_token');
    const body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.apiService.loginCall('login', body).subscribe({
      next: (response: any) => {
        let token = response.token;
        console.log(token);
        // localStorage.setItem('token', token);
        this.jwtService.setUser(token);
        // window.location.reload();
      },
      error: (error) => {
        this.errorBool = true;
        this.errorMessage = 'An error occured retrieving data';
      },
      complete: () => {
        // window.location.reload();
        let token: any = localStorage.getItem('token');
        let user = JSON.stringify(atob(token.split('.')[1]));
        this.userLoggedIn.emit(user);
        this.router.navigate(['home']);
      },
    });
  }
}
