import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  http = inject(HttpClient)
  profileUrl = 'http://localhost:8080/api/user'

  getMyProfile(){
    return this.http.get<User>(`${this.profileUrl}/my-profile`)
  }

}
