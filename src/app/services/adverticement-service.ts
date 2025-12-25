import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Adverticement} from '../models/adverticement';

@Injectable({
  providedIn: 'root',
})
export class AdverticementService {

  http = inject(HttpClient)

  getAllAdverticements(page : number, name: string){
    return this.http.get<Adverticement[]>(`http://localhost:8080/api/general/adverticement/${page}/12?name=${name}`)
  }

  addNewAdverticement(adverticement: Adverticement){
    return this.http.post<Adverticement>('http://localhost:8080/api/general/adverticement', adverticement)
  }

  getCategories(){
    return this.http.get('http://localhost:8080/api/general/categories')
  }

}
