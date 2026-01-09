import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MapCard} from '../../common-ui/map-card/map-card';
import {Search} from '../../common-ui/search/search';
import {TuiButton} from '@taiga-ui/core';
import {Router} from '@angular/router';
import {AdvertisementCard} from '../../common-ui/adverticement-card/advertisement-card';
import {AdvertisementService} from '../../services/advertisement-service';
import {Advertisement} from '../../models/Advertisement';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MapCard,
    Search,
    TuiButton,
    AdvertisementCard,
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage implements OnInit{

  router = inject(Router)
  advertisementService = inject(AdvertisementService)
  cdr = inject(ChangeDetectorRef)

  newAdvertisements: Advertisement[] = []

  ngOnInit() {
    this.getAdvertisements('', 1)
  }

  getAdvertisements(search: string, category: number){
    this.advertisementService.getAdvertisements(0, 10, search, category, 'id,asc')
      .subscribe({
          next: (response: any) => {
            this.newAdvertisements = response.content

            console.log(this.newAdvertisements)

            this.cdr.detectChanges()
          }
        }
      )
  }

  toFeedPage() {
    this.router.navigate(['feed'])
  }

  toAdvertisementPage() {
    this.router.navigate(['advertisements', 1])
  }

  toTasksPage() {
    this.router.navigate(['tasks'])
  }
}
