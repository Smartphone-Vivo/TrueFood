export class Review{

  id: number | null
  authorId: number | null
  rating: number | null
  reviewText: string

  constructor() {
    this.id = null
    this.authorId = null
    this.rating = null
    this.reviewText = ''
  }

}
