import {ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {Task} from '../../../models/Task';
import {TaskService} from '../../../services/task-service';
import {ProfileCard} from '../../../common-ui/profile-card/profile-card';
import {TuiSegmented} from '@taiga-ui/kit';

@Component({
  selector: 'app-my-task-card',
  imports: [
    TuiAppearance,
    TuiButton,
    ProfileCard,
    TuiSegmented
  ],
  templateUrl: './my-task-card.html',
  styleUrl: './my-task-card.scss',
})
export class MyTaskCard {

  @Input({required: true}) tasks!: Task[]

  taskService = inject(TaskService)

  cdr = inject(ChangeDetectorRef)

  contentType: string = 'myTasks'

  //todo пофиксить логику
  responseTask(id: number | null){
    this.taskService.addResponseTask(id).subscribe(
      {
        next: (updatedTask: any) => {
          if(id != null){
            this.tasks = this.tasks.map(task =>
              task.id === id ? updatedTask : task)
          }
        }
      })

  }

  confirmWorker() {
  }

  setContentType(contentType: string) {
    this.contentType = contentType
  }
}
