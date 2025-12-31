import {Image} from './Image';

export class User{

  constructor() {
    this.email = ''
    this.password = ''
    this.fio = ''
    this.imagesId = {
      id: null,
      imageUrls: []
    }
    this.rating = ''
  }

  email: string
  password: string
  fio: string
  imagesId: Image
  rating: string

}
