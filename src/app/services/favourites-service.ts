import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {

  http = inject(HttpClient)

  baseUrl = 'http://localhost:8080/api/favourites'

  addAdvertisementToFavourites(id: number){
    return this.http.get(`${this.baseUrl}/add-to-favourites/${id}`)
  }

  getFavouriteAdvertisements(page: number, size: number){
    return this.http.get(`${this.baseUrl}/get-favourite-advertisements/${page}/8`)
  }



}
