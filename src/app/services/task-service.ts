import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Advertisement} from '../models/Advertisement';
import {Task} from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  http = inject(HttpClient)

  baseUrl = 'http://localhost:8080/api/user'

  getTasks(page : number, size: number, name: string, categoryId: number){
    return this.http.get<Advertisement[]>(`http://localhost:8080/api/guest/tasks/${page}/${size}?name=${name}&categoryId=${categoryId}`)
  }

  addNewTask(task: Advertisement){
    return this.http.post<Advertisement>(`${this.baseUrl}/task`, task)
  }

  addResponseTask(taskId: number | null){
    return this.http.get<Task>(`${this.baseUrl}/add-task-response/${taskId}`)
  }

  getUserTask(id: number | null){
    return this.http.get<Task[]>(`http://localhost:8080/api/user/tasks-by-user/${id}/0/3`)
  }

  getUserResponses(){
    return this.http.get<Task[]>('http://localhost:8080/api/user/responses-by-user/0/12')
  }

  removeResponse(taskId: number | null, workerId: number | null){
    return this.http.delete(`http://localhost:8080/api/user/remove-response/${taskId}/${workerId}`)
  }


  confirmWorker(taskId: number | null, workerId: number | null){
    return this.http.get(`http://localhost:8080/api/user/confirm-worker/${taskId}/${workerId}`)
  }
}
