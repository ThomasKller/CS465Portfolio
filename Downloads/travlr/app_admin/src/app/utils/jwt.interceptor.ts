import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);

  const isAuthAPI = req.url.startsWith('login') || req.url.startsWith('register');

  if (authenticationService.isLoggedIn() && !isAuthAPI) {
    const token = authenticationService.getToken();
    console.log('Token:', token);

    if (!token) {
      console.error('No token found! User might not be logged in.');
    }

    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next(authReq);
  }

  return next(req);
};
