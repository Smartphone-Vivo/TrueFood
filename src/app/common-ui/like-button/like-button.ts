import {Component, inject, Input, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiLike} from "@taiga-ui/kit";
import {Adverticement} from '../../models/adverticement';
import {Router} from '@angular/router';
import {AdverticementService} from '../../services/adverticement-service';

@Component({
  selector: 'app-like-button',
  imports: [
    ReactiveFormsModule,
    TuiLike,
    FormsModule
  ],
  templateUrl: './like-button.html',
  styleUrl: './like-button.scss',
})
export class LikeButton implements OnInit{

  @Input({ required: true }) advertisement!: Adverticement;
  @Input({ required: false }) favouriteAdvertisements!: Adverticement[];

  ngOnInit(): void {
    this.likeCheck()
    console.log('likecheck' ,this.favouriteAdvertisements)
  }

  router = inject(Router)
  advertisementService = inject(AdverticementService)
  liked: boolean = false;

  addToFavourites() {
    if(this.advertisement.id){
      if(!this.liked){
        this.advertisementService.addAdvertisementToFavourites(this.advertisement.id).subscribe()
        this.liked = true
      }
      else{
        this.advertisementService.deleteFromFavouriteAdvertisements(this.advertisement.id).subscribe()
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
