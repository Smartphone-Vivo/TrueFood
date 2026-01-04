import {Image} from './Image';
import {Category} from './category';

export class Order {

  constructor() {

    this.id = null
    this.title = ""
    this.description = ""
    this.category = {
      id: null,
      parent: null,
      name: ''
    }
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
  category: Category
  categoryId: number | null
  price: number | null
  location: string
  imagesId: Image
  orderType: string
  authorId: number | null
  createdAt: string
  enable: boolean

}
