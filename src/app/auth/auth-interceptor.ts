import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });

    // only for special cases like third-party API without the added auth header - for now only 'a' term for the demo
    const exludedRequests = req.url;
    const authRequestWithoutAuthoroziationHeader = req.clone();
    if (exludedRequests === 'https://api.cdnjs.com/libraries?search=a') {
      return next.handle(authRequestWithoutAuthoroziationHeader);
    } else if (exludedRequests === 'https://api.cdnjs.com/libraries?search=') {
      return next.handle(authRequestWithoutAuthoroziationHeader);
    }

    return next.handle(authRequest);
  }
}
