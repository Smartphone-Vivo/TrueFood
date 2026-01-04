export class Category{

  constructor() {
    this.id = null
    this.parent = null
    this.name = ""
  }

  id: number | null
  parent: Category | null
  name: string

}
