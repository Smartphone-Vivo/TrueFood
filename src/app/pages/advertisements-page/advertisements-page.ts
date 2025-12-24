import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {AdverticementCard} from '../../common-ui/adverticement-card/adverticement-card';
import {AdverticementService} from '../../services/adverticement-service';
import {Adverticement} from '../../models/adverticement';
import {TuiPagination, TuiTreeItem, TuiTreeItemController} from '@taiga-ui/kit';

@Component({
  selector: 'app-advertisements-page',
  imports: [
    AdverticementCard,
    TuiTreeItemController,
    TuiTreeItem,
    TuiPagination
  ],
  templateUrl: './advertisements-page.html',
  styleUrl: './advertisements-page.scss',
})
export class AdvertisementsPage implements OnInit{

  adverticementService = inject(AdverticementService)

  changeDetector = inject(ChangeDetectorRef)

  newAdverticements: Adverticement[] = []

  protected length = 12;

  protected index = 0;

  currentPage = 0

  ngOnInit() {
    this.getNewAdverticements()
  }


  getNewAdverticements(){
    this.adverticementService.getAllAdverticements(this.index)
      .subscribe({
          next: (response: any) => {
            this.newAdverticements = response.content
            this.length = response.totalPages
            this.index = response.number
            this.currentPage = response.number
            console.log(this.newAdverticements)

            this.changeDetector.detectChanges()
          }
        }
      )
  }





  protected goToPage(index: number): void {
    this.index = index;
    this.getNewAdverticements()
    console.info('New page:', index);
  }

}
