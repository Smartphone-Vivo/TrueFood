import {Component, inject, Input, OnInit} from '@angular/core';
import {TuiAppearance, TuiIcon} from '@taiga-ui/core';
import {Advertisement} from '../../models/Advertisement';
import {Router} from '@angular/router';
import {AdvertisementService} from '../../services/advertisement-service';
import {FormsModule} from '@angular/forms';
import {LikeButton} from '../like-button/like-button';
import {FavouritesService} from '../../services/favourites-service';

@Component({
  selector: 'app-adverticement-card',
  imports: [
    TuiAppearance,
    TuiIcon,
    FormsModule,
    LikeButton
  ],
  templateUrl: './advertisement-card.html',
  styleUrl: './advertisement-card.scss',
  standalone: true
})
export class AdvertisementCard {

  @Input({ required: true }) advertisement!: Advertisement;
  @Input({ required: false }) favouriteAdvertisements!: Advertisement[];

  router = inject(Router)

  toAdvertisement(id: number | null){
    this.router.navigate(['/advertisement', id])
  }

}
