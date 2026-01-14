import {Image} from './Image';
import {Review} from './Review';

export class User{

  constructor() {
    this.id = null
    this.email = ''
    this.password = ''
    this.fio = ''
    this.imageUrl = ''
    this.rating = ''
    this.avatar = {
      id: null,
      imageUrls: []
    }
    this.reviews = []
    this.contacts = ''
    this.enable = true
  }
  id: number | null
  email: string
  password: string
  fio: string
  avatar: Image
  imageUrl: string //todo url и urls и вообще с данными перелопатить эту кучу
  rating: string
  reviews: Review[]
  contacts: string
  enable: boolean
}
