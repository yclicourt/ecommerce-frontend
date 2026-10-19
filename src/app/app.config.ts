import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { SpinnerInterceptor } from '@shared/interceptors/spinner.interceptor';
import { JwtInterceptor } from '@shared/interceptors/jwt-interceptor.interceptor';
import { ConfigService } from '@shared/services/config.service';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([SpinnerInterceptor, JwtInterceptor])),
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr({
      timeOut: 2000,
      preventDuplicates: true,
    }),

    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () =>
        configService.loadConfig(),
      deps: [ConfigService],
      multi: true,
    },
  ],
};
