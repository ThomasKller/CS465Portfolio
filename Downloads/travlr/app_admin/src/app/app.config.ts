import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { jwtInterceptor } from './utils/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
              provideRouter(routes),
              provideHttpClient(withInterceptors([jwtInterceptor])),
              importProvidersFrom(HttpClient)
            ]
};
