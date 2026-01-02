import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {Review} from '../models/Review';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  http = inject(HttpClient)
  profileUrl = 'http://localhost:8080/api/user'

  getMyProfile(){
    return this.http.get<User>(`${this.profileUrl}/my-profile`)
  }

  getProfile(id: number | null){
    return this.http.get<User>(`${this.profileUrl}/profile/${id}`)
  }

  addReview(review: Review, id: number| null){
    return this.http.post<Review>(`${this.profileUrl}/add-review/${id}`, review)
  }

}
