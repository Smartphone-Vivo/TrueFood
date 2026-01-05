import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {AdverticementService} from '../../services/adverticement-service';
import {Order} from '../../models/Order';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {TuiLike} from '@taiga-ui/kit';
import {ProfileCard} from '../../common-ui/profile-card/profile-card';

@Component({
  selector: 'app-feed-page',
  imports: [
    TuiAppearance,
    TuiLike,
    TuiButton,
    ProfileCard
  ],
  templateUrl: './feed-page.html',
  styleUrl: './feed-page.scss',
})
export class FeedPage implements OnInit{

  advertisementService = inject(AdverticementService)
  cdr = inject(ChangeDetectorRef)

  advertisements: Order[] = []

  currentCard: number = 0

  protected length = 6

  protected index = 0

  currentPage = 0

  isSwiping = false
  swipeDirection: 'left' | 'right' | '' = ''

  ngOnInit() {
    this.getAdvertisements()
  }

  getAdvertisements(){
    this.advertisementService.getAdvertisements(this.index, 12,'', 1)
      .subscribe({
          next: (response: any) => {
            this.advertisements = response.content
            this.length = response.totalPages
            this.index = response.number
            this.currentPage = response.number
            console.log('thisAdvertisements', this.advertisements)

            this.cdr.detectChanges()
          }
        }
      )
  }

  toFavoritePage() {

  }

  swipeLeft() {
    this.swipeDirection = 'left'
    this.currentCard++;
    this.isSwiping = true

    setTimeout(() => {
      this.nextCard()
      this.cdr.detectChanges()
    }, 300)
    }

  swipeRight() {
    this.swipeDirection = 'right'
    this.currentCard++;
    this.isSwiping = true

    setTimeout(() => {
      this.nextCard()
      this.cdr.detectChanges()
    }, 300)
  }

  nextCard(){
    if(this.currentCard < this.advertisements.length - 1){
      this.currentCard++
      this.resetSwipeState()
    }
    else{
      this.getAdvertisements()
      this.currentCard = 0
    }
    this.resetSwipeState()
  }

  resetSwipeState(){
    setTimeout(() => {
      this.swipeDirection = ''
      this.isSwiping = false
      this.cdr.detectChanges()
    }, 50)
  }
}
