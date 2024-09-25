import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
// import { reqInterceptor } from './core/interceptors/http-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    ReactiveFormsModule,
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    // { provide: HTTP_INTERCEPTORS, useClass: reqInterceptor, multi: true },
    provideExperimentalZonelessChangeDetection(),
    provideCharts(withDefaultRegisterables()),
  ],
};
