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
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ApiService } from '../../../core/services/api-service.service';
import { Router } from '@angular/router';
import { JWTTokenService } from '../../../core/services/jwt-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  //Servicios requeridos
  apiService = inject(ApiService);
  jwtService = inject(JWTTokenService);
  //Construcción de formulario
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
  });
  //Errores?
  errorBool: Boolean = false;
  errorMessage: string = '';
  //Output = comunicar que se registró exitosamente el usuario
  userLoggedIn = output<string>();

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    //Validadores
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: [
        '',
        [Validators.required, this.signUpForm.addValidators(this.isTheSame)],
      ],
    });
  }
  onSubmit() {
    //Eliminar token anteriores si los hubiera, particularmente para este momento
    // de desarrollo
    localStorage.removeItem('auth_token');
    const body = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
    };

    this.apiService.signUpCall('signup', body).subscribe({
      next: (response: any) => {
        let token = response.token;
        console.log(token);
        localStorage.setItem('token', token);
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

  isTheSame: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value.password === control.value.password2
      ? null
      : { PasswordNoMatch: true };
  };
}
