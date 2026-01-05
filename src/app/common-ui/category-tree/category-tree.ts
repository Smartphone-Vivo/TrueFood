import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
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

  @Output() toCategory = new EventEmitter<number>();

  ngOnChanges() {
  }

  get rootCategories() {
    return this.categories.filter(cat => cat.parent === null);
  }

  getChildren(parentId: number | null) {
    return this.categories.filter(cat =>
      cat.parent && cat.parent.id === parentId
    );
  }

  goToCategory(id: number | null){
    console.log('goToCategory ',id)
    // @ts-ignore
    this.toCategory.emit(id)
  }

  setCategory(id: number){

  }

}
