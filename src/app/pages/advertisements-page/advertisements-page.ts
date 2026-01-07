import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {AdverticementCard} from '../../common-ui/adverticement-card/adverticement-card';
import {AdverticementService} from '../../services/adverticement-service';
import {Order} from '../../models/Order';
import {TuiChevron, TuiPagination, TuiTreeItemController} from '@taiga-ui/kit';
import {TuiButton, TuiDropdownDirective, TuiDropdownManual} from '@taiga-ui/core';
import {TuiActiveZone, TuiObscured} from '@taiga-ui/cdk';
import {Search} from '../../common-ui/search/search';
import {Category} from '../../models/category';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryTree} from '../../common-ui/category-tree/category-tree';
import {Navigation} from '../../common-ui/navigation/navigation';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-advertisements-page',
  imports: [
    AdverticementCard,
    TuiTreeItemController,
    TuiPagination,
    TuiButton,
    TuiChevron,
    TuiDropdownDirective,
    TuiDropdownManual,
    TuiObscured,
    TuiActiveZone,
    Search,
    CategoryTree,
    Navigation,
  ],
  templateUrl: './advertisements-page.html',
  styleUrl: './advertisements-page.scss',
  standalone: true
})
export class AdvertisementsPage implements OnInit{

  adverticementService = inject(AdverticementService)
  authService = inject(AuthService)

  changeDetector = inject(ChangeDetectorRef)
  router = inject(Router)
  route = inject(ActivatedRoute)

  newAdverticements: Order[] = []
  categories: Category[] = []
  favouriteAdvertisements: Order[] = []
  currentCategory: number = 1
  protected length = 6
  protected index = 0
  currentPage = 0
  searchValue: string = ''
  categoriesList: Category[] = []

  ngOnInit() {
    this.route.params.subscribe(
      params => this.currentCategory = Number(params['id'])
    )
    this.getAdverticements('', this.currentCategory)
    this.getCategories()
    this.getFavouriteAdvertisements()
    this.getCategoriesList()
  }

  protected openProfile = false;

  protected onClickProfile(): void {
    this.openProfile = !this.openProfile;
  }

  protected onObscuredProfile(obscured: boolean): void {
    if (obscured) {
      this.openProfile = false;
    }
  }

  protected onActiveZoneProfile(active: boolean): void {
    this.openProfile = active && this.openProfile;
  }

  onSearch(searchValue: string){
    this.getAdverticements(searchValue, this.currentCategory)
    this.searchValue = searchValue
  }

  setCategory(id: number){
    this.currentCategory = id
    this.getAdverticements(this.searchValue, this.currentCategory)
  }

  getAdverticements(search: string, category: number){
    this.adverticementService.getAdvertisements(this.index, 12, search, category)
      .subscribe({
          next: (response: any) => {
            this.newAdverticements = response.content
            this.length = response.totalPages
            this.index = response.number
            this.currentPage = response.number
            console.log(this.newAdverticements)

            this.changeDetector.detectChanges()
          }
      }
      )
    }

  protected goToPage(index: number): void {
    this.index = index;
    this.getAdverticements(this.searchValue, this.currentCategory)
    console.info('New page:', index);
  }

  getCategoriesList(){
    let category = this.categories[this.currentCategory]
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
    console.log('категории', this.categoriesList)

  }

  getCategories(){
    this.adverticementService.getCategories().subscribe(
      {
        next:(response: any) => {
          this.categories = response
          console.log('Категории', this.categories)
          this.changeDetector.detectChanges()
        }
      }
    )
  }

  toDorogo() {}

  toDeshevo() {}


  getFavouriteAdvertisements(){

      this.adverticementService.getFavouriteAdvertisements(this.index, 5)
        .subscribe({
            next: (response: any) => {
              this.favouriteAdvertisements = response.content
              this.length = response.totalPages
              this.index = response.number
              this.currentPage = response.number
              this.changeDetector.detectChanges()
            }
          }
        )
  }

}
