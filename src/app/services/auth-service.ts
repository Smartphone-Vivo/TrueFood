import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Register} from '../models/Register';
import {tap} from 'rxjs';
import {TokenResponse} from '../auth/auth.interface';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  http = inject(HttpClient)
  cookieService = inject(CookieService)

  token: string | null = null

  authUrl: string = 'http://localhost:8080/api/auth'

  registerNewUser(payload:{fio: string, email: string, password: string}){
    return this.http.post(`${this.authUrl}/register`, payload)
  }

  login(payload:{email: string, password: string}){
    return this.http.post<TokenResponse>(`${this.authUrl}/login`, payload)
      .pipe(
        tap(val => {
          this.token = val.accessToken

          this.cookieService.set('accessToken', val.accessToken)
        })
    )
  }

  isAuth(){
    if(this.cookieService.check('accessToken')){
      return true
    }else{
      return false
    }
  }

  logout(){
    this.cookieService.deleteAll()
    this.isAuth()

  }

}
