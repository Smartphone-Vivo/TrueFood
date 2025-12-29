import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AdverticementService} from '../../services/adverticement-service';
import {Adverticement} from '../../models/adverticement';
import {AdvertisementsPage} from '../advertisements-page/advertisements-page';
import {TuiAppearance, TuiButton, TuiLink, TuiLoader} from '@taiga-ui/core';
import {TuiBreadcrumbs, TuiLike} from '@taiga-ui/kit';
import {TuiItem} from '@taiga-ui/cdk';
import {Category} from '../../models/category';
import {AdverticementCard} from '../../common-ui/adverticement-card/adverticement-card';

@Component({
  selector: 'app-one-advertisement-page',
  imports: [
    TuiAppearance,
    TuiButton,
    TuiLike,
    TuiBreadcrumbs,
    RouterLink,
    TuiLink,
    TuiItem,
    AdverticementCard,
    TuiLoader
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

// @ts-ignore
  currentAdvertisement: Advertisement = null

  categories: Category[] = []

  categoriesList: string[] = []

  newAdvertisements: Adverticement[] = []

  ngOnInit(){
    this.route.params.subscribe(
      params => {
        this.advertisementId = params['id']
        console.log('adverticementId', this.advertisementId)
      }
    )
    this.getAdvertisement()
    this.getCategories()
    this.getAdvertisements('')
  }
  //todo категории сделать по человечески
  getCategoriesList(){

    const category = Number(this.currentAdvertisement.categoryId) - 1
    // @ts-ignore
    this.categoriesList.unshift(this.categories[category] )
    if(this.currentAdvertisement.category.parent.id != null){
      this.categoriesList.unshift(this.currentAdvertisement.category.parent.id)
    }
    console.log('текущий список категорий',this.categoriesList, this.categories[0].name)
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

  protected items = [
    {
      caption: 'Selects',
      routerLink: '/components/select',
    },
    {
      caption: 'Multi',
      routerLink: '/components/multi-select',
    },
    {
      caption: 'With tags',
      routerLink: '/components/multi-select',
    },
    {
      caption: 'Current',
      routerLink: '/navigation/breadcrumbs',
      routerLinkActiveOptions: {exact: true},
    },
  ];

  setCurrentImage(id: number){
    this.currentImageId = id
  }

  getAdvertisement(){
    this.advertisementService.getAdvertisementById(this.advertisementId).subscribe(
      response => {
        this.currentAdvertisement = response
        this.imageUrls = this.currentAdvertisement.imagesId.imageUrls
        console.log('currentAdvertisement', this.imageUrls)
        this.getCategoriesList()
        this.getCategories()
        this.changeDetector.detectChanges()
      }
    )
  }

  toAdvertisements(){
    this.router.navigate(['/advertisements'])
  }

  getAdvertisements(search: string){
    this.advertisementService.getAllAdverticements(0, 6, '')
      .subscribe({
          next: (response: any) => {
            this.newAdvertisements = response.content
            this.changeDetector.detectChanges()
            }
          }
        )
    }

  toAdvertisement(id: number | null){
    console.log('advertisement id', id)
    if(id != null){
      this.advertisementId = String(id)
      this.changeDetector.detectChanges()
    }

  }


}
