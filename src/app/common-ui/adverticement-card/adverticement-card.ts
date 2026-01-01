import {Component, inject, Input, OnInit} from '@angular/core';
import {TuiAppearance, TuiIcon} from '@taiga-ui/core';
import {Adverticement} from '../../models/adverticement';
import {TuiLike} from '@taiga-ui/kit';
import {Router} from '@angular/router';
import {AdverticementService} from '../../services/adverticement-service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-adverticement-card',
  imports: [
    TuiAppearance,
    TuiIcon,
    TuiLike,
    FormsModule
  ],
  templateUrl: './adverticement-card.html',
  styleUrl: './adverticement-card.scss',
  standalone: true
})
export class AdverticementCard implements OnInit{

  @Input({ required: true }) advertisement!: Adverticement;

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
      this.advertisementService.addAdvertisementToFavourites(this.advertisement.id).subscribe()
    }
  }
}
