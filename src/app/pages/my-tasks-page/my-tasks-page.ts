import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {TaskCard} from '../../common-ui/task-card/task-card';
import {TaskService} from '../../services/task-service';
import {AuthService} from '../../auth/auth-service';
import {Advertisement} from '../../models/Advertisement';
import {Task} from '../../models/Task';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/User';
import {Review} from '../../models/Review';
import {MyTaskCard} from './my-task-card/my-task-card';
import {TuiSegmented} from '@taiga-ui/kit';
import {MyResponseCard} from './my-response-card/my-response-card';

@Component({
  selector: 'app-my-tasks-page',
  imports: [
    MyTaskCard,
    TuiSegmented,
    MyResponseCard
  ],
  templateUrl: './my-tasks-page.html',
  styleUrl: './my-tasks-page.scss',
})
export class MyTasksPage implements OnInit{

  taskService = inject(TaskService)
  authService = inject(AuthService)

  advertisements: Advertisement[] = []

  myTasks: Task[] = []
  myResponses: Task[] = []

  cdr = inject(ChangeDetectorRef)

  user: User = new User()

  protected length = 12

  protected index = 0

  currentPage = 0

  totalOrders: number = 0

  contentType: string = 'myTasks' //todo поменять обратно наTasks

  ngOnInit(){
    this.getMyTasks()
  }

  getMyTasks(){
    this.taskService.getUserTask(Number(this.authService.getMe())).subscribe({
      next: (response: any) => {
        console.log('таски', Number(this.authService.getMe()))
        this.myTasks = response.content
        this.length = response.totalPages
        this.index = response.number
        this.currentPage = response.number
        this.totalOrders = response.totalElements
        this.cdr.detectChanges()
      }
    })
  }

  getMyResponses(){
    this.taskService.getUserResponses().subscribe({
      next: (response: any) => {
        this.myResponses = response.content
        this.length = response.totalPages
        this.index = response.number
        this.currentPage = response.number
        this.totalOrders = response.totalElements
        this.cdr.detectChanges()
      }
    })
  }

  setContentType(contentType: string) {
    if(contentType == 'myTasks'){
      this.contentType = 'myTasks'
      this.getMyTasks()
      this.cdr.detectChanges()
    }
    else{
      this.contentType = 'myResponses'
      this.getMyResponses()
      this.cdr.detectChanges()
    }
    console.log('contenttype', this.contentType)
  }

  updateTask(updatedTask: Task) {
    if(this.contentType == 'myTasks'){
      this.getMyTasks()
      this.cdr.detectChanges()
    }
    else{
      this.getMyResponses()
    }
  }
}
