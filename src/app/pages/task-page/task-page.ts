import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {Search} from '../../common-ui/search/search';
import {AdverticementService} from '../../services/adverticement-service';
import {Order} from '../../models/Order';
import {TaskCard} from '../../common-ui/task-card/task-card';
import {TaskService} from '../../services/task-service';

@Component({
  selector: 'app-task-page',
  imports: [
    Search,
    TaskCard
  ],
  templateUrl: './task-page.html',
  styleUrl: './task-page.scss',
  standalone: true
})
export class TaskPage implements OnInit{

  taskService = inject(TaskService)
  cdr = inject(ChangeDetectorRef)

  newTasks: Order[] = []

  currentCategory: string = ''

  protected length = 6

  protected index = 0

  currentPage = 0

  searchValue: string = ''

  ngOnInit() {
    this.getTasks('')
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


}
