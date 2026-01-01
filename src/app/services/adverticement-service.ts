import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Adverticement} from '../models/adverticement';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AdverticementService {

  http = inject(HttpClient)

  getAllAdverticements(page : number, size: number, name: string){
    return this.http.get<Adverticement[]>(`http://localhost:8080/api/general/adverticement/${page}/${size}?name=${name}`)
  }

  getAdvertisementById(id: string){
    return this.http.get(`http://localhost:8080/api/general/advertisement/${id}`)
  }

  getAdverticementsByCategory(page : number, name: string, categoryId: number){
    return this.http.get<Adverticement[]>(`http://localhost:8080/api/general/adverticement/${page}/12?name=${name}&categoryId=${categoryId}`)
  }

  addNewAdverticement(adverticement: Adverticement){
    return this.http.post<Adverticement>('http://localhost:8080/api/general/adverticement', adverticement)
  }

  getCategories(){
    return this.http.get('http://localhost:8080/api/general/categories')
  }

  uploadFile(file: FormControl<File | null>){
    return this.http.put('http://localhost:9001/api/v1/buckets/images', file)
  }

  getAdvertisementsByUser(id: string, page: number){
    return this.http.get<Adverticement[]>(`http://localhost:8080/api/user/advertisements-by-user/${id}/${page}/6`)
  }

  addAdvertisementToFavourites(id: number){
    return this.http.get(`http://localhost:8080/api/user/add-to-favourites/${id}`)
  }

  getFavouriteAdvertisements(page: number, size: number){
    return this.http.get(`http://localhost:8080/api/user/get-favourite-advertisements/${page}/8`)
  }


  deleteFromFavouriteAdvertisements(advId: number){
    return this.http.delete(`http://localhost:8080/api/user/delete-favoirite-advertisement/${advId}`)
  }

}
