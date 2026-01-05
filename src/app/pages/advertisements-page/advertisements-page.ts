import {ChangeDetectorRef, Component, inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AdverticementCard} from '../../common-ui/adverticement-card/adverticement-card';
import {AdverticementService} from '../../services/adverticement-service';
import {Order} from '../../models/Order';
import {TuiBreadcrumbs, TuiChevron, TuiPagination, TuiTreeItem, TuiTreeItemController} from '@taiga-ui/kit';
import {TuiAppearance, TuiButton, TuiDropdownDirective, TuiDropdownManual} from '@taiga-ui/core';
import {TuiActiveZone, TuiObscured} from '@taiga-ui/cdk';
import {Search} from '../../common-ui/search/search';
import {Category} from '../../models/category';
import {TuiLoader} from '@taiga-ui/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryTree} from '../../common-ui/category-tree/category-tree';

@Component({
  selector: 'app-advertisements-page',
  imports: [
    AdverticementCard,
    TuiTreeItemController,
    TuiTreeItem,
    TuiPagination,
    TuiButton,
    TuiChevron,
    TuiDropdownDirective,
    TuiDropdownManual,
    TuiObscured,
    TuiActiveZone,
    Search,
    TuiAppearance,
    TuiLoader,
    CategoryTree,
    TuiBreadcrumbs,
  ],
  templateUrl: './advertisements-page.html',
  styleUrl: './advertisements-page.scss',
  standalone: true
})
export class AdvertisementsPage implements OnInit{

  adverticementService = inject(AdverticementService)

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

  ngOnInit() {
    this.route.params.subscribe(
      params => this.currentCategory = params['id']
    )
    this.getAdverticements('', this.currentCategory)
    this.getCategories()
    this.getFavouriteAdvertisements()

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
    console.log('searchValue',searchValue)
    this.getAdverticements(searchValue, this.currentCategory)
    this.searchValue = searchValue
  }

  setCategory(id: number){
    console.log('выбранный id')
    this.currentCategory = id
    console.log('currentCategory', id)
    this.getAdverticements(this.searchValue, this.currentCategory)
  }

  getAdverticements(search: string, category: number){
    console.log('значение поиск', this.currentCategory)

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

  toAdvertisement(id: number | null){
    this.router.navigate(['/advertisement', id])
  }

  getFavouriteAdvertisements(){ //todo вот эту функцию убрать
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
