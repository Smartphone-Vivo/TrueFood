import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {AdverticementService} from '../../services/adverticement-service';
import {Adverticement} from '../../models/adverticement';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {TuiLike} from '@taiga-ui/kit';

@Component({
  selector: 'app-feed-page',
  imports: [
    TuiAppearance,
    TuiLike,
    TuiButton
  ],
  templateUrl: './feed-page.html',
  styleUrl: './feed-page.scss',
})
export class FeedPage implements OnInit{

  advertisementService = inject(AdverticementService)
  cdr = inject(ChangeDetectorRef)

  advertisements: Adverticement[] = []

  protected length = 6

  protected index = 0

  currentPage = 0

  ngOnInit() {
    this.getAdvertisements()
  }

  getAdvertisements(){
    this.advertisementService.getAllAdverticements(this.index, 12,'')
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
}
