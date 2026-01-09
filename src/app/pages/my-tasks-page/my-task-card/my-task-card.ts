import {ChangeDetectorRef, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {Task} from '../../../models/Task';
import {TaskService} from '../../../services/task-service';
import {ProfileCard} from '../../../common-ui/profile-card/profile-card';
import {TuiBadge, TuiSegmented, TuiStatus} from '@taiga-ui/kit';
import {GetContactsButton} from '../../../common-ui/get-contacts-button/get-contacts-button';

@Component({
  selector: 'app-my-task-card',
  imports: [
    TuiAppearance,
    TuiButton,
    ProfileCard,
    GetContactsButton,
  ],
  templateUrl: './my-task-card.html',
  styleUrl: './my-task-card.scss',
})
export class MyTaskCard {

  @Input({required: true}) tasks!: Task[]
  @Output() taskUpdated = new EventEmitter<Task>()

  taskService = inject(TaskService)

  cdr = inject(ChangeDetectorRef)

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

  confirmWorker(workerId: number | null, taskId: number | null) {
    this.taskService.confirmWorker(taskId, workerId).subscribe()
    window.location.reload()
  }

  removeWorker(taskId: number | null, workerId: number | null) {
    this.taskService.removeResponse(taskId, workerId).subscribe()
    window.location.reload()
  }

  getContacts() {

  }
}
