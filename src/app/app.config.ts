import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withEnabledBlockingInitialNavigation
} from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withJsonpSupport, withInterceptors } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ),
    provideHttpClient(
      withJsonpSupport(),
      withInterceptors([authInterceptor]) // Nouvelle façon de fournir les intercepteurs
    ),
    provideAnimations(),
    importProvidersFrom(
      MatNativeDateModule,
      TranslateModule.forRoot({
        defaultLanguage: 'fr',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    Title,
    TranslateService
  ]
};