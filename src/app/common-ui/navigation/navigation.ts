import {
  ChangeDetectorRef,
  Component, EventEmitter,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {TuiBreadcrumbs} from '@taiga-ui/kit';
import {AdvertisementService} from '../../services/advertisement-service';
import {Category} from '../../models/category';
import {Router} from '@angular/router';
import {TuiItem} from '@taiga-ui/cdk';
import {CategoryService} from '../../services/category-service';

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
  categoryService = inject(CategoryService)

  cdr = inject(ChangeDetectorRef)
  router = inject(Router)


  categories: Category[] = []
  categoriesList: Category[] = []

  @Input({transform: numberAttribute, required: true}) categoryId!: number | null

  @Output() toCategory = new EventEmitter<number>()

  ngOnChanges() {
    this.getCategories()
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
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
    if(id){
      this.toCategory.emit(id)
    }
  }

}





