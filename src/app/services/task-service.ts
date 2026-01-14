import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Advertisement} from '../models/Advertisement';
import {Task} from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  http = inject(HttpClient)

  baseUrl = 'http://localhost:8080/api/tasks'

  getTasks(page : number, size: number, name: string, categoryId: number){
    return this.http.get<Advertisement[]>(`${this.baseUrl}/${page}/${size}?name=${name}&categoryId=${categoryId}`)
  }

  addNewTask(task: Advertisement){
    return this.http.post<Advertisement>(`${this.baseUrl}`, task)
  }

  addResponseTask(taskId: number | null){
    return this.http.get<Task>(`${this.baseUrl}/add-task-response/${taskId}`)
  }

  getUserTask(id: number | null){
    return this.http.get<Task[]>(`${this.baseUrl}/tasks-by-user/${id}/0/3`)
  }

  getUserResponses(){
    return this.http.get<Task[]>(`${this.baseUrl}/responses-by-user/0/12`)
  }

  removeResponse(taskId: number | null, workerId: number | null){
    return this.http.delete(`${this.baseUrl}/remove-worker/${taskId}/${workerId}`)
  }

  confirmWorker(taskId: number | null, workerId: number | null){
    return this.http.get(`${this.baseUrl}/confirm-worker/${taskId}/${workerId}`)
  }

  getTaskById(id: number | null){
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  editTask(task: Task){
    return this.http.put<Task>(`${this.baseUrl}/edit-task`, task)
  }

  deleteTask(id: number | null){
    return this.http.delete(`${this.baseUrl}/delete-task/${id}`)
  }

}
