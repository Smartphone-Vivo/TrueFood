import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Register} from '../models/Register';
import {tap} from 'rxjs';
import {TokenResponse} from '../auth/auth.interface';
import {CookieService} from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  http = inject(HttpClient)
  cookieService = inject(CookieService)

  token: string | null = null

  authUrl: string = 'http://localhost:8080/api/auth'

  registerNewUser(user: User){

    return this.http.post(`${this.authUrl}/register`, user)
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

  get isAuth(){
    if(!this.token){
      this.token = this.cookieService.get('accessToken')
      // console.log('decoded token')
    }
    return !!this.token
  }

  logout(){
    this.cookieService.deleteAll()
    this.isAuth

  }

  getDecodedAccessToken(token: string){
    try{
      return jwtDecode(token)
    } catch(Error){
      return null
    }
  }

  getMe(){
    if(this.isAuth){
      this.token = this.cookieService.get('accessToken')
      console.log('расшифровка токена ',this.getDecodedAccessToken(this.token)?.id)
      return this.getDecodedAccessToken(this.token)?.id
    } else{
      return null
    }
  }

}
