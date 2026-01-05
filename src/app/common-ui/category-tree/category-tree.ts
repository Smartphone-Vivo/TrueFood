import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TuiTreeItem} from "@taiga-ui/kit";
import {Category} from '../../models/category';

@Component({
  selector: 'app-category-tree',
    imports: [
        TuiTreeItem
    ],
  templateUrl: './category-tree.html',
  styleUrl: './category-tree.scss',
})
export class CategoryTree implements OnChanges{

  @Input ({required: true}) categories!: Category[]

  ngOnChanges() {
    this.categorySort()
  }
  get rootCategories() {
    return this.categories.filter(cat => cat.parent === null);
  }

  getChildren(parentId: number | null) {
    return this.categories.filter(cat =>
      cat.parent && cat.parent.id === parentId
    );
  }

  categorySort(){
    let category: Category;
    for(category of this.categories){
      console.log('категории', this.categories)
    }
  }

  goToCategory(id: number | null){
    console.log('goToCategory ',id)
  }

  setCategory(id: number) {

  }
}
