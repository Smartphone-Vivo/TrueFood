import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Adverticement} from '../models/adverticement';

@Injectable({
  providedIn: 'root',
})
export class AdverticementService {

  http = inject(HttpClient)

  getAllAdverticements(){
    return this.http.get<Adverticement[]>('http://localhost:8080/api/general/alladverticement')
  }

}
