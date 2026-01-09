import {HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from './auth-service';
import {catchError, throwError} from 'rxjs';


export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService)
  const token = inject(AuthService).token

  if(!token) return next(req)

  const addToken = (req: HttpRequest<any>, token: String) => {
    return req = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })
  }

  return  next(addToken(req, token)).pipe(
    catchError(error => {
      return throwError(error)
    })
  )


}

