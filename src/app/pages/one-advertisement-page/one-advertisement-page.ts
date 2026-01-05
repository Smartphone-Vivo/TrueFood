import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdverticementService} from '../../services/adverticement-service';
import {Order} from '../../models/Order';
import {TuiAppearance, TuiButton, TuiLoader} from '@taiga-ui/core';
import {Category} from '../../models/category';
import {AdverticementCard} from '../../common-ui/adverticement-card/adverticement-card';
import {LikeButton} from '../../common-ui/like-button/like-button';
import {ProfileCard} from '../../common-ui/profile-card/profile-card';
import {Navigation} from '../../common-ui/navigation/navigation';

@Component({
  selector: 'app-one-advertisement-page',
  imports: [
    TuiAppearance,
    TuiButton,
    AdverticementCard,
    TuiLoader,
    LikeButton,
    ProfileCard,
    Navigation
  ],
  templateUrl: './one-advertisement-page.html',
  styleUrl: './one-advertisement-page.scss',
  standalone: true
})
export class OneAdvertisementPage implements OnInit{

  route = inject(ActivatedRoute)
  advertisementService = inject(AdverticementService)
  router = inject(Router)
  changeDetector = inject(ChangeDetectorRef)

  imageUrls: string[] = []

  currentImageId: number = 0

  advertisementId: string = ''

  currentAdvertisement: Order = new Order

  categories: Category[] = []

  categoriesList: Category[] = []

  newAdvertisements: Order[] = []

  favouriteAdvertisements: Order[] = []

  ngOnInit(){
    this.route.params.subscribe(
      params => {
        this.advertisementId = params['id']
        console.log('adverticementId', this.advertisementId)
      }
    )
    this.getAdvertisement()
    this.getCategories()
    this.getAdvertisements()
    this.getFavouriteAdvertisements()
  }

  getCategoriesList(){
    let category = this.currentAdvertisement.category
    this.categoriesList = []

    console.log('let category', category)
    while(category){
      this.categoriesList.unshift(category)
      if(category.parent && category.parent.id !== null && category.parent.id !== undefined){
        category = category.parent
      } else{
        break
      }
    }
  }

  getCategories(){
    this.advertisementService.getCategories().subscribe(
      {
        next:(response: any) => {
          this.categories = response
          console.log('Категории', this.categories)
          this.changeDetector.detectChanges()
        }
      }
    )
  }

  setCurrentImage(id: number){
    this.currentImageId = id
  }

  getAdvertisement(){
    this.advertisementService.getAdvertisementById(this.advertisementId).subscribe(
      (response: any) => {
        this.currentAdvertisement = response
        this.imageUrls = this.currentAdvertisement.imagesId.imageUrls
        console.log('currentAdvertisement', this.currentAdvertisement)
        this.getCategoriesList()
        this.getCategories()
        this.changeDetector.detectChanges()
      }
    )
  }

  toAdvertisements(id: number | null){
    this.router.navigate(['/advertisements', id])
  }

  getAdvertisements(){
    this.advertisementService.getAdvertisements(0, 6, '', 1)
      .subscribe({
          next: (response: any) => {
            this.newAdvertisements = response.content
            this.changeDetector.detectChanges()
            }
          }
        )
    }

  toAdvertisement(id: number | null){
    if(id != null){
      this.advertisementId = String(id)
      window.location.reload()
      this.changeDetector.detectChanges()
    }

  }

  addToFavourites() {
    if(this.currentAdvertisement.id){
      this.advertisementService.addAdvertisementToFavourites(this.currentAdvertisement.id).subscribe()
    }

  }

  getFavouriteAdvertisements(){
    this.advertisementService.getFavouriteAdvertisements(0, 5)
      .subscribe({
          next: (response: any) => {
            this.favouriteAdvertisements = response.content
            this.changeDetector.detectChanges()
          }
        }
      )
  }
}
