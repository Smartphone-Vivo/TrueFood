export class Category{

  constructor() {
    this.id = ''
    this.parent = null
    this.name = ""
  }

  id: string
  parent: Category | null
  name: string

}
