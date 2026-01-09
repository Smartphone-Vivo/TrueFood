import {ChangeDetectorRef, Component, inject, OnChanges, OnInit} from '@angular/core';
import {Search} from '../../common-ui/search/search';
import {AdvertisementService} from '../../services/advertisement-service';
import {Advertisement} from '../../models/Advertisement';
import {TaskCard} from '../../common-ui/task-card/task-card';
import {TaskService} from '../../services/task-service';
import {Task} from '../../models/Task';
import {Navigation} from '../../common-ui/navigation/navigation';
import {CategoryTree} from '../../common-ui/category-tree/category-tree';
import {Category} from '../../models/category';
import {SortSelect} from '../../common-ui/sort-select/sort-select';
import {CategoryService} from '../../services/category-service';

@Component({
  selector: 'app-task-page',
  imports: [
    Search,
    TaskCard,
    Navigation,
    CategoryTree,
    SortSelect
  ],
  templateUrl: './task-page.html',
  styleUrl: './task-page.scss',
  standalone: true
})
export class TaskPage implements OnInit{

  taskService = inject(TaskService)
  categoryService = inject(CategoryService)
  cdr = inject(ChangeDetectorRef)

  newTasks: Task[] = []

  currentCategory: number = 1

  protected length = 6

  protected index = 0

  currentPage = 0

  searchValue: string = ''

  categories: Category[] = []

  categoriesList: Category[] = []

  ngOnInit() {
    this.getTasks('')
    this.getCategories()
    this.getCategoriesList()
  }

  getTasks(search: string){
    console.log('значение поиск', this.searchValue)
      this.taskService.getTasks(this.index, 12, search, this.currentCategory)
        .subscribe({
            next: (response: any) => {
              this.newTasks = response.content
              this.length = response.totalPages
              this.index = response.number
              this.currentPage = response.number
              console.log(this.newTasks)

              this.cdr.detectChanges()
            }
          }
        )
    }


  setCategory(id: number) {
    this.currentCategory = id
    this.getTasks(this.searchValue)
    this.cdr.detectChanges()
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
  this.categoryService.getCategories().subscribe(
    {
      next:(response: any) => {
        this.categories = response
        console.log('Категории', this.categories)
        this.cdr.detectChanges()
      }
    }
  )
}

}
