import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {TuiAppearance, TuiButton, TuiIcon} from '@taiga-ui/core';
import {Advertisement} from '../../models/Advertisement';
import {Router} from '@angular/router';
import {AdvertisementService} from '../../services/advertisement-service';
import {FormsModule} from '@angular/forms';
import {LikeButton} from '../like-button/like-button';
import {FavouritesService} from '../../services/favourites-service';
import {AuthService} from '../../auth/auth-service';
import {TuiButtonLoading, TuiChevron, TuiLike} from '@taiga-ui/kit';
import {Task} from '../../models/Task';

@Component({
  selector: 'app-adverticement-card',
  imports: [
    TuiAppearance,
    TuiIcon,
    FormsModule,
    LikeButton,
    TuiButton,
  ],
  templateUrl: './advertisement-card.html',
  styleUrl: './advertisement-card.scss',
  standalone: true
})
export class AdvertisementCard implements OnInit{

  @Input({ required: true }) advertisement!: Advertisement;
  @Input({ required: false }) favouriteAdvertisements!: Advertisement[];

  authService = inject(AuthService)

  router = inject(Router)

  ngOnInit(){
    console.log(this.advertisement.authorId)
  }

  toAdvertisement(id: number | null){
    this.router.navigate(['/advertisement', id])
  }

  editAdvertisement(id: number | null){
    console.log('navigatetiedit', id)
    this.router.navigate(['editadvertisement', id])
  }

}
