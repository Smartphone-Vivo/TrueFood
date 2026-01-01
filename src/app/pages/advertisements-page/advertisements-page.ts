import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {AdverticementCard} from '../../common-ui/adverticement-card/adverticement-card';
import {AdverticementService} from '../../services/adverticement-service';
import {Adverticement} from '../../models/adverticement';
import {TuiChevron, TuiPagination, TuiTreeItem, TuiTreeItemController} from '@taiga-ui/kit';
import {TuiAppearance, TuiButton, TuiDropdownDirective, TuiDropdownManual} from '@taiga-ui/core';
import {TuiActiveZone, TuiObscured} from '@taiga-ui/cdk';
import {Search} from '../../common-ui/search/search';
import {Category} from '../../models/category';
import {TuiLoader} from '@taiga-ui/core';
import {Router} from '@angular/router';

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
  ],
  templateUrl: './advertisements-page.html',
  styleUrl: './advertisements-page.scss',
  standalone: true
})
export class AdvertisementsPage implements OnInit{

  adverticementService = inject(AdverticementService)

  changeDetector = inject(ChangeDetectorRef)

  router = inject(Router)

  newAdverticements: Adverticement[] = []

  categories: Category[] = []

  favouriteAdvertisements: Adverticement[] = []

  currentCategory: number | null = null

  protected length = 6

  protected index = 0

  currentPage = 0

  searchValue: string = ''

  ngOnInit() {
    this.getAdverticements('')
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

  setCategory(categoryName: number | null){
    this.currentCategory = categoryName
    this.getAdverticements(this.searchValue)
    console.log('выбранная категория', this.currentCategory)
  }

  onSearch(searchValue: string){
    console.log('searchValue',searchValue)
    this.getAdverticements(searchValue)
    this.searchValue = searchValue
  }

  getAdverticements(search: string){
    console.log('значение поиск', this.searchValue)
    if(this.currentCategory == null) {
      this.adverticementService.getAllAdverticements(this.index, 12, search)
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
      else{
        this.adverticementService.getAdverticementsByCategory(this.index, search, this.currentCategory)
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
    }



  protected goToPage(index: number): void {
    this.index = index;
    this.getAdverticements(this.searchValue)
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
