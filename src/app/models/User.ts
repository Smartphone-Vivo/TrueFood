import {Image} from './Image';

export class User{

  constructor() {
    this.email = ''
    this.password = ''
    this.fio = ''
    this.imageUrl = ''
    this.rating = ''
    this.avatar = {
      id: null,
      imageUrls: []
    }
  }

  email: string
  password: string
  fio: string
  avatar: Image
  imageUrl: string //todo url и urls и вообще с данными перелопатить эту кучу
  rating: string

}
