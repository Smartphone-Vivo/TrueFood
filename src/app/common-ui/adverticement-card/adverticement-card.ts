import {Component, inject, Input, OnInit} from '@angular/core';
import {TuiAppearance, TuiIcon} from '@taiga-ui/core';
import {Order} from '../../models/Order';
import {Router} from '@angular/router';
import {AdverticementService} from '../../services/adverticement-service';
import {FormsModule} from '@angular/forms';
import {LikeButton} from '../like-button/like-button';

@Component({
  selector: 'app-adverticement-card',
  imports: [
    TuiAppearance,
    TuiIcon,
    FormsModule,
    LikeButton
  ],
  templateUrl: './adverticement-card.html',
  styleUrl: './adverticement-card.scss',
  standalone: true
})
export class AdverticementCard implements OnInit{

  @Input({ required: true }) advertisement!: Order;
  @Input({ required: false }) favouriteAdvertisements!: Order[];


  router = inject(Router)
  advertisementService = inject(AdverticementService)
  liked: boolean = false;

  ngOnInit() {

  }

  toAdvertisement(id: number | null){
    this.router.navigate(['/advertisement', id])
  }


  addToFavourites() {
    if(this.advertisement.id){
      if(!this.liked){
        this.advertisementService.addAdvertisementToFavourites(this.advertisement.id).subscribe()
      }
      else{
        this.advertisementService.deleteFromFavouriteAdvertisements(this.advertisement.id).subscribe()
      }
    }
  }





}
