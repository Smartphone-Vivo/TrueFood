import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Review} from '../models/Review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {

  http = inject(HttpClient)

  addReview(review: Review, id: number| null){
    return this.http.post<Review>(`http://localhost:8080/reviews/add-review/${id}`, review)
  }

}
