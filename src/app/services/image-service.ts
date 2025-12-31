import {inject, Injectable} from '@angular/core';
import {Image} from '../models/Image';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  http = inject(HttpClient)

  addOneImage(file: File){
    const formData = new FormData()
    formData.append('file', file);
    console.log('formData', formData)
    return this.http.post<Image>(`http://localhost:8080/api/files/upload`, formData)
  }

  addMultipleImages(files: File[]){
    const formData = new FormData()

    files.forEach(file => {
      formData.append('file', file);
    });

    console.log('formData', formData.values())

    return this.http.post<Image>(`http://localhost:8080/api/files/upload`, formData)
  }
}
