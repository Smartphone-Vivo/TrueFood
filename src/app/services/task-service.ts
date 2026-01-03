import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../models/Order';


@Injectable({
  providedIn: 'root',
})
export class TaskService {

  http = inject(HttpClient)

  baseUrl = 'http://localhost:8080/api/user'

  getTasks(page : number, size: number, name: string, categoryId: string){
    return this.http.get<Order[]>(`http://localhost:8080/api/guest/tasks/${page}/${size}?name=${name}&categoryId=${categoryId}`)
  }

  addNewTask(task: Order){
    return this.http.post<Order>(`${this.baseUrl}/task`, task)
  }

}
