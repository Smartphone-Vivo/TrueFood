import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../models/Order';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AdverticementService {

  http = inject(HttpClient)

  getAdvertisements(page : number, size: number, name: string, categoryId: string){
    return this.http.get<Order[]>(`http://localhost:8080/api/guest/advertisements/${page}/${size}?name=${name}&categoryId=${categoryId}`)
  }

  getAdvertisementById(id: string){
    return this.http.get(`http://localhost:8080/api/guest/advertisement/${id}`)
  }

  addNewAdvertisement(advertisement: Order){
    console.log('addNewAdvertisement')
    return this.http.post<Order>('http://localhost:8080/api/user/advertisement', advertisement)
  }

  getCategories(){
    return this.http.get('http://localhost:8080/api/guest/categories')
  }

  getAdvertisementsByUser(id: number| null, page: number){
    return this.http.get<Order[]>(`http://localhost:8080/api/user/advertisements-by-user/${id}/${page}/6`)
  }

  addAdvertisementToFavourites(id: number){
    return this.http.get(`http://localhost:8080/api/user/add-to-favourites/${id}`)
  }

  getFavouriteAdvertisements(page: number, size: number){
    return this.http.get(`http://localhost:8080/api/user/get-favourite-advertisements/${page}/8`)
  }

  deleteFromFavouriteAdvertisements(advId: number){
    return this.http.delete(`http://localhost:8080/api/user/delete-favourite-advertisement/${advId}`)
  }

}
