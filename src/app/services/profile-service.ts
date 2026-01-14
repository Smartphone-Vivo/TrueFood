import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {Review} from '../models/Review';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  http = inject(HttpClient)
  baseUrl = 'http://localhost:8080/api/profile'

  getProfile(id: number | null){
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

  getUserContacts(id: number | null){
    return this.http.get(`${this.baseUrl}/user-contacts/${id}`)
  }

  getAllUsers(index: number){
    return this.http.get(`${this.baseUrl}/get-all-users/${index}/12`)
  }

  banControlUser(id: number | null){
    return this.http.get(`${this.baseUrl}/ban-user/${id}`)
  }
}
