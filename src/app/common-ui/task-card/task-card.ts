import {ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit} from '@angular/core';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {Order} from '../../models/Order';
import {TaskService} from '../../services/task-service';
import {Task} from '../../models/Task';

@Component({
  selector: 'app-task-card',
  imports: [
    TuiAppearance,
    TuiButton
  ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
  standalone: true
})
export class TaskCard implements OnChanges{

  @Input({required: true}) tasks!: Task[]

  taskService = inject(TaskService)

  cdr = inject(ChangeDetectorRef)



  ngOnChanges() {
    console.log('tasks', this.tasks)
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
}
