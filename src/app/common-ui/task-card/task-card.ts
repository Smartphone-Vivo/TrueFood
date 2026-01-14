import {ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit} from '@angular/core';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {Advertisement} from '../../models/Advertisement';
import {TaskService} from '../../services/task-service';
import {Task} from '../../models/Task';
import {AuthService} from '../../auth/auth-service';
import {Router} from '@angular/router';

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
  authService = inject(AuthService)

  router = inject(Router)
  cdr = inject(ChangeDetectorRef)

  ngOnChanges() {
    console.log('tasks', this.tasks)
  }

  //todo пофиксить логику
  responseTask(id: number | null){
    this.taskService.addResponseTask(id).subscribe()
    window.location.reload()

  }

  editTask(id: number | null) {
    this.router.navigate(['edittask', id])
  }
}
