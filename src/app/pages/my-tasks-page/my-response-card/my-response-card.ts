import {ChangeDetectorRef, Component, inject, Input, OnInit} from '@angular/core';
import {Task} from '../../../models/Task';
import {TaskService} from '../../../services/task-service';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {TuiBadge, TuiStatus} from '@taiga-ui/kit';

@Component({
  selector: 'app-my-response-card',
  imports: [
    TuiAppearance,
    TuiButton,
    TuiBadge,
    TuiStatus
  ],
  templateUrl: './my-response-card.html',
  styleUrl: './my-response-card.scss',
  standalone: true
})
export class MyResponseCard implements OnInit{

  @Input({required: true}) tasks!: Task[]

  taskService = inject(TaskService)

  cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    console.log('myResponseCard - responses', this.tasks)
  }

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

}
