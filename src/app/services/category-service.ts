import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  http = inject(HttpClient)

  baseUrl = 'http://localhost:8080/api/categories'

  getCategories(){
    return this.http.get(this.baseUrl)
  }

}
