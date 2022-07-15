import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTc5ODY1MTYsInR5cGUiOiJ3ZWIiLCJ1c2VyIjoiamF2YXNjcmlwdCJ9.zPvvEZcm_sv7DjEhyNa33wSBR3Ojqo5gA607oWdD_Db0daH45ZjoGdAI50wLEljOdEayFmgbFfTB7qdZRyQVhg';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const reqClone = request.clone({
      
      headers: request.headers.set('Authorization', 'Bearer ' + TOKEN)
    });

    return next.handle(reqClone);
  }
}
