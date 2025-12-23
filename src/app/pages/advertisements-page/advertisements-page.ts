import {Component, inject, OnInit} from '@angular/core';
import {AdverticementCard} from '../../common-ui/adverticement-card/adverticement-card';
import {AdverticementService} from '../../services/adverticement-service';
import {Adverticement} from '../../models/adverticement';
import {TuiTreeItem, TuiTreeItemController} from '@taiga-ui/kit';

@Component({
  selector: 'app-advertisements-page',
  imports: [
    AdverticementCard,
    TuiTreeItemController,
    TuiTreeItem
  ],
  templateUrl: './advertisements-page.html',
  styleUrl: './advertisements-page.scss',
})
export class AdvertisementsPage implements OnInit{

  adverticementService = inject(AdverticementService)

  newAdverticements: Adverticement[] = []

  ngOnInit() {
    this.getNewAdverticements()
  }

  getNewAdverticements(){
    this.adverticementService.getAllAdverticements()
      .subscribe({
          next: (response: Adverticement[]) => {
            this.newAdverticements = response

            console.log(this.newAdverticements)
          }
        }
      )
  }

}
