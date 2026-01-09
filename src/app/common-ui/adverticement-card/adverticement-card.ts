import {Component, inject, Input, OnInit} from '@angular/core';
import {TuiAppearance, TuiIcon} from '@taiga-ui/core';
import {Advertisement} from '../../models/Advertisement';
import {Router} from '@angular/router';
import {AdvertisementService} from '../../services/advertisement-service';
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

  @Input({ required: true }) advertisement!: Advertisement;
  @Input({ required: false }) favouriteAdvertisements!: Advertisement[];


  router = inject(Router)
  advertisementService = inject(AdvertisementService)
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
