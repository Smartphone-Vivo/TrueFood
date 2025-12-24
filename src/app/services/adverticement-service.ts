import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Adverticement} from '../models/adverticement';

@Injectable({
  providedIn: 'root',
})
export class AdverticementService {

  http = inject(HttpClient)

  getAllAdverticements(page : number){
    return this.http.get<Adverticement[]>(`http://localhost:8080/api/general/adverticement/${page}/12`)
  }

  addNewAdverticement(adverticement: Adverticement){
    return this.http.post<Adverticement>('http://localhost:8080/api/general/adverticement', adverticement)
  }

}
