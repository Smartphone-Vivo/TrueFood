import {Image} from './Image';
import {Category} from './category';

export class Advertisement {

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
    this.images = {
      id: null,
      imageUrls: []
    }
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
  images: Image
  authorId: number | null
  createdAt: string
  enable: boolean

}
