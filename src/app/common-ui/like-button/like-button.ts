import {Component, inject, Input, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiLike} from "@taiga-ui/kit";
import {Advertisement} from '../../models/Advertisement';
import {Router} from '@angular/router';
import {AdvertisementService} from '../../services/advertisement-service';
import {FavouritesService} from '../../services/favourites-service';

@Component({
  selector: 'app-like-button',
  imports: [
    ReactiveFormsModule,
    TuiLike,
    FormsModule
  ],
  templateUrl: './like-button.html',
  styleUrl: './like-button.scss',
  standalone: true
})
export class LikeButton implements OnInit{

  @Input({ required: true }) advertisement!: Advertisement;
  @Input({ required: false }) favouriteAdvertisements!: Advertisement[];

  ngOnInit(): void {
    this.likeCheck()
  }

  favouritesService = inject(FavouritesService)
  router = inject(Router)

  liked: boolean = false;

  addToFavourites() {
    if(this.advertisement.id){
      if(!this.liked){
        this.favouritesService.addAdvertisementToFavourites(this.advertisement.id).subscribe()
        this.liked = true
      }
      else{
        this.favouritesService.deleteFromFavouriteAdvertisements(this.advertisement.id).subscribe()
        this.liked = false
      }
    }
  }

  likeCheck(){
    if(this.favouriteAdvertisements.some(item => item.id === this.advertisement.id)){
      this.liked = true
    }
    else{
      this.liked = false
    }
  }
}
