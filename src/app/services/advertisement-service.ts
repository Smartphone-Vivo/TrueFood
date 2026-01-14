import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Advertisement} from '../models/Advertisement';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService {

  http = inject(HttpClient)

  baseUrl = 'http://localhost:8080/api/advertisements'

  getAdvertisements(page : number, size: number, name: string, categoryId: number, sortValue: string){
    return this.http.get<Advertisement[]>(`${this.baseUrl}/${page}/${size}?name=${name}&categoryId=${categoryId}&sort=${sortValue}`)
  }

  getAdvertisementById(id: number | null){
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  addNewAdvertisement(advertisement: Advertisement){
    console.log('addNewAdvertisement')
    return this.http.post<Advertisement>(`${this.baseUrl}/new-advertisement`, advertisement)
  }

  getAdvertisementsByUser(id: number| null, page: number){
    return this.http.get<Advertisement[]>(`${this.baseUrl}/advertisements-by-user/${id}/${page}/6`)
  }

  editAdvertisement(editedAdvertisement: Advertisement){
    return this.http.put<Advertisement>(`${this.baseUrl}/edit-advertisement`, editedAdvertisement)
  }

  deleteAdvertisement(id: number | null){
    return this.http.delete(`${this.baseUrl}/delete-advertisement/${id}`)
  }

}
