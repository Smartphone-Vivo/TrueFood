import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdvertisementService} from '../../services/advertisement-service';
import {Advertisement} from '../../models/Advertisement';
import {TuiAppearance, TuiButton, TuiLoader} from '@taiga-ui/core';
import {Category} from '../../models/category';
import {AdvertisementCard} from '../../common-ui/adverticement-card/advertisement-card';
import {LikeButton} from '../../common-ui/like-button/like-button';
import {ProfileCard} from '../../common-ui/profile-card/profile-card';
import {Navigation} from '../../common-ui/navigation/navigation';
import {CategoryService} from '../../services/category-service';
import {FavouritesService} from '../../services/favourites-service';
import {AuthService} from '../../auth/auth-service';

@Component({
  selector: 'app-one-advertisement-page',
  imports: [
    TuiAppearance,
    TuiButton,
    AdvertisementCard,
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

  advertisementService = inject(AdvertisementService)
  categoryService = inject(CategoryService)
  authService = inject(AuthService)
  favouritesService = inject(FavouritesService)

  router = inject(Router)
  changeDetector = inject(ChangeDetectorRef)
  route = inject(ActivatedRoute)
  imageUrls: string[] = []

  currentImageId: number = 0

  advertisementId: number | null = null

  currentAdvertisement: Advertisement = new Advertisement

  categories: Category[] = []

  categoriesList: Category[] = []

  newAdvertisements: Advertisement[] = []

  favouriteAdvertisements: Advertisement[] = []

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
    this.categoryService.getCategories().subscribe(
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
        this.imageUrls = this.currentAdvertisement.images.imageUrls
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
    this.advertisementService.getAdvertisements(0, 6, '', 1, 'createdAt,desc')
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
      this.advertisementId = id
      window.location.reload()
      this.changeDetector.detectChanges()
    }
  }


  getFavouriteAdvertisements(){
    this.favouritesService.getFavouriteAdvertisements(0, 5)
      .subscribe({
          next: (response: any) => {
            this.favouriteAdvertisements = response.content
            this.changeDetector.detectChanges()
          }
        }
      )
  }

  setCategory(id: number){
    this.router.navigate(['advertisements', id])
    this.changeDetector.detectChanges()
  }
}
