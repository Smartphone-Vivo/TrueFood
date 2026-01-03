import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';

import {ChangeDetectionStrategy} from '@angular/core';
import {AdverticementService} from '../../services/adverticement-service';
import {Order} from '../../models/Order';
import {AdverticementCard} from '../../common-ui/adverticement-card/adverticement-card';
import {Router} from '@angular/router';
import {TuiPagination} from '@taiga-ui/kit';



@Component({
  standalone: true,
  selector: 'app-favorites-page',
  imports: [
    AdverticementCard,
    TuiPagination
  ],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPage implements OnInit{

  advertisementServise = inject(AdverticementService)
  cdr = inject(ChangeDetectorRef)
  router = inject(Router)

  favouriteAdvertisements: Order[] = []

  protected length = 0

  protected index = 0

  currentPage = 0

  ngOnInit() {
    this.getFavouriteAdvertisements()
  }

  getFavouriteAdvertisements(){
    this.advertisementServise.getFavouriteAdvertisements(this.index, 5)
      .subscribe({
        next: (response: any) => {
          this.favouriteAdvertisements = response.content
          this.length = response.totalPages
          this.index = response.number
          this.currentPage = response.number
          this.cdr.detectChanges()
        }
      }
    )
  }

  toAdvertisement(id: number | null){
    this.router.navigate(['/advertisement', id])
  }

  protected goToPage(index: number): void {
    this.index = index;
    this.getFavouriteAdvertisements()
    console.info('New page:', index);
  }


}

