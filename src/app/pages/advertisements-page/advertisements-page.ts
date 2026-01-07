import {ChangeDetectorRef, Component, inject, OnChanges, OnInit} from '@angular/core';
import {AdverticementCard} from '../../common-ui/adverticement-card/adverticement-card';
import {AdverticementService} from '../../services/adverticement-service';
import {Order} from '../../models/Order';
import {TuiPagination, TuiTreeItemController} from '@taiga-ui/kit';
import {Search} from '../../common-ui/search/search';
import {Category} from '../../models/category';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryTree} from '../../common-ui/category-tree/category-tree';
import {Navigation} from '../../common-ui/navigation/navigation';
import {SortSelect} from '../../common-ui/sort-select/sort-select';

@Component({
  selector: 'app-advertisements-page',
  imports: [
    AdverticementCard,
    TuiTreeItemController,
    TuiPagination,
    Search,
    CategoryTree,
    Navigation,
    SortSelect,
  ],
  templateUrl: './advertisements-page.html',
  styleUrl: './advertisements-page.scss',
  standalone: true
})
export class AdvertisementsPage implements OnInit, OnChanges{

  advertisementService = inject(AdverticementService)
  changeDetector = inject(ChangeDetectorRef)
  router = inject(Router)
  route = inject(ActivatedRoute)

  newAdvertisements: Order[] = []
  categories: Category[] = []
  favouriteAdvertisements: Order[] = []
  currentCategory: number = 1
  protected length = 6
  protected index = 0
  currentPage = 0
  searchValue: string = ''
  categoriesList: Category[] = []
  sortValue = ""

  ngOnInit() {
    this.route.params.subscribe(
      params => this.currentCategory = Number(params['id'])
    )
    this.getAdvertisements('', this.currentCategory)
    this.getCategories()
    this.getFavouriteAdvertisements()
    this.getCategoriesList()
  }

  ngOnChanges() {
    this.getAdvertisements(this.searchValue, this.currentCategory)
  }

  getSortValue(sortValue: string){
    this.sortValue = sortValue
    console.log('sort value', this.sortValue)
    this.getAdvertisements(this.searchValue, this.currentCategory)
    this.changeDetector.detectChanges()
  }

  onSearch(searchValue: string){
    this.getAdvertisements(searchValue, this.currentCategory)
    this.searchValue = searchValue
  }

  setCategory(id: number){
    this.currentCategory = id
    this.getAdvertisements(this.searchValue, this.currentCategory)
    this.changeDetector.detectChanges()
  }

  getAdvertisements(search: string, category: number){
    this.advertisementService.getAdvertisements(this.index, 12, search, category, this.sortValue)
      .subscribe({
          next: (response: any) => {
            this.newAdvertisements = response.content
            this.length = response.totalPages
            this.index = response.number
            this.currentPage = response.number
            this.changeDetector.detectChanges()
          }
      })
    }

  protected goToPage(index: number): void {
    this.index = index;
    this.getAdvertisements(this.searchValue, this.currentCategory)
  }

  getCategoriesList(){
    let category = this.categories[this.currentCategory]
    this.categoriesList = []

    while(category){
      this.categoriesList.unshift(category)
      if(category.parent && category.parent.id !== null && category.parent.id !== undefined){
        category = category.parent
      }
      else{
        break
      }
    }
  }

  getCategories(){
    this.advertisementService.getCategories().subscribe({
        next:(response: any) => {
          this.categories = response
          console.log('Категории', this.categories)
          this.changeDetector.detectChanges() //todo объединить и вынести в сервис
        }
      })
  }

  getFavouriteAdvertisements(){
    this.advertisementService.getFavouriteAdvertisements(this.index, 5)
      .subscribe({
          next: (response: any) => {
            this.favouriteAdvertisements = response.content
            this.length = response.totalPages
            this.index = response.number
            this.currentPage = response.number
            this.changeDetector.detectChanges()
          }
      })
  }
}
