import {Image} from './Image';

export class Order {

  constructor() {

    this.id = null
    this.title = ""
    this.description = ""
    this.categoryId = null
    this.price = null
    this.location = ""
    this.imagesId = {
      id: null,
      imageUrls: []
    }
    this.orderType = ""
    this.authorId = null
    this.createdAt = ""
    this.enable = true

  }

  id: number | null
  title: string
  description: string
  categoryId: number | null
  price: number | null
  location: string
  imagesId: Image
  orderType: string
  authorId: number | null
  createdAt: string
  enable: boolean

}
