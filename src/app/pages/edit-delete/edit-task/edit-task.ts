import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiButton, TuiLabel, TuiTextfieldComponent} from "@taiga-ui/core";
import {TuiTextarea, TuiTextareaLimit} from "@taiga-ui/kit";
import {AdvertisementService} from '../../../services/advertisement-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Advertisement} from '../../../models/Advertisement';
import {Task} from '../../../models/Task';
import {TaskService} from '../../../services/task-service';

@Component({
  selector: 'app-edit-task',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiLabel,
    TuiTextarea,
    TuiTextareaLimit,
    TuiTextfieldComponent,
    FormsModule
  ],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.scss',
})
export class EditTask implements OnInit{


  taskService = inject(TaskService)

  router = inject(Router)
  route = inject(ActivatedRoute)

  currentTask: Task = new Task()

  id: number | null = null

  ngOnInit(){
    this.route.params.subscribe(
      params => {
        this.id = params['id']
        console.log('adverticementId', this.id)
      }
    )
    this.getAdvertisement(this.id)
  }

  getAdvertisement(id: number | null){
    this.taskService.getTaskById(id).subscribe({
      next: (response : any) => {
        this.currentTask = response
      }
    })
  }

  confirmChanges() {
    this.taskService.editTask(this.currentTask).subscribe()
    this.router.navigate(['advertisements', this.currentTask.categoryId])
  }

  deleteTask(id: number | null){
    this.taskService.deleteTask(id).subscribe()
    this.router.navigate(['tasks'])
  }

}
