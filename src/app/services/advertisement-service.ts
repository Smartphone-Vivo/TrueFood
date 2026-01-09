import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Advertisement} from '../models/Advertisement';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService {

  http = inject(HttpClient)

  getAdvertisements(page : number, size: number, name: string, categoryId: number, sortValue: string){
    return this.http.get<Advertisement[]>(`http://localhost:8080/api/guest/advertisements/${page}/${size}?name=${name}&categoryId=${categoryId}&sort=${sortValue}`)
  }

  getAdvertisementById(id: string){
    return this.http.get(`http://localhost:8080/api/guest/advertisement/${id}`)
  }

  addNewAdvertisement(advertisement: Advertisement){
    console.log('addNewAdvertisement')
    return this.http.post<Advertisement>('http://localhost:8080/api/user/advertisement', advertisement)
  }

  getCategories(){
    return this.http.get('http://localhost:8080/api/guest/categories')
  }

  getAdvertisementsByUser(id: number| null, page: number){
    return this.http.get<Advertisement[]>(`http://localhost:8080/api/guest/advertisements-by-user/${id}/${page}/6`)
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
