import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Review} from '../models/Review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {

  http = inject(HttpClient)
  baseUrl = 'http://localhost:8080/api/reviews'

  addReview(review: Review, id: number| null){
    return this.http.post<Review>(`${this.baseUrl}/add-review/${id}`, review)
  }

}
