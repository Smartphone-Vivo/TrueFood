import {ChangeDetectorRef, Component, inject, Input, numberAttribute, OnChanges, SimpleChanges} from '@angular/core';
import {TuiBreadcrumbs} from '@taiga-ui/kit';
import {AdverticementService} from '../../services/adverticement-service';
import {Category} from '../../models/category';
import {Router} from '@angular/router';
import {TuiItem} from '@taiga-ui/cdk';

@Component({
  selector: 'app-navigation',
  imports: [
    TuiBreadcrumbs,
    TuiItem
  ],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
  standalone: true
})
export class Navigation implements OnChanges {
  advertisementService = inject(AdverticementService)

  cdr = inject(ChangeDetectorRef)
  router = inject(Router)

  categories: Category[] = []
  categoriesList: Category[] = []

  @Input({transform: numberAttribute, required: true}) categoryId!: number | null

  ngOnChanges() {
    this.getCategories()
  }

  getCategories() {
    this.advertisementService.getCategories().subscribe(
      {
        next: (response: any) => {
          this.categories = response
          this.cdr.detectChanges()
          // @ts-ignore
          let category: Category = this.categories.find(ctg => ctg.id === this.categoryId)

          this.categoriesList = []


          while (category) {
            this.categoriesList.unshift(category)
            if (category.parent && category.parent.id !== null && category.parent.id !== undefined) {
              category = category.parent
            } else {
              break
            }
          }
        }
      }
    )
  }

  goToAdvertisements(id: number | null) {
    this.router.navigate(['advertisements', id])
  }

}





