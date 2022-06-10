import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTQ5NzA2NjIsInR5cGUiOiJ3ZWIiLCJ1c2VyIjoiamF2YXNjcmlwdCJ9.Cwh9ipv91VRirxwnohW_YLLpxATK0b08cGf-VtiyblgKE6j7YbqfXZOOwd_GSDGdFvt_QhLCbncCTQGauE_jMg';
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
