export class Adverticement{

  constructor() {

    this.id = null
    this.title = ""
    this.description = ""
    this.categoryId = null
    this.price = null
    this.location = ""
    this.imagesId = null
    this.itemType = ""
    this.createdAt = ""
    this.enable = true

  }

  id: number | null
  title: string
  description: string
  categoryId: null
  price: number | null
  location: string
  imagesId: number | null
  itemType: string
  createdAt: string
  enable: boolean

}
