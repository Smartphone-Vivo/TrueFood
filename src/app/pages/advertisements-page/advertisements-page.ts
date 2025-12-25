import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {AdverticementCard} from '../../common-ui/adverticement-card/adverticement-card';
import {AdverticementService} from '../../services/adverticement-service';
import {Adverticement} from '../../models/adverticement';
import {TuiChevron, TuiPagination, TuiTreeItem, TuiTreeItemController} from '@taiga-ui/kit';
import {TuiButton, TuiDropdownDirective, TuiDropdownManual} from '@taiga-ui/core';
import {TuiActiveZone, TuiObscured} from '@taiga-ui/cdk';
import {Search} from '../../common-ui/search/search';

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
  ],
  templateUrl: './advertisements-page.html',
  styleUrl: './advertisements-page.scss',
})
export class AdvertisementsPage implements OnInit{

  adverticementService = inject(AdverticementService)

  changeDetector = inject(ChangeDetectorRef)

  newAdverticements: Adverticement[] = []

  categories: any = []

  protected length = 12

  protected index = 0

  currentPage = 0

  searchValue: string = ''

  ngOnInit() {
    this.getAdverticements('')
    this.getCategories()
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
    this.getAdverticements(searchValue)
    this.searchValue = searchValue
  }

  getAdverticements(search: string){
    console.log('значение поиск', this.searchValue)
    this.adverticementService.getAllAdverticements(this.index, search)
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


}
