import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../models/Order';


@Injectable({
  providedIn: 'root',
})
export class TaskService {

  http = inject(HttpClient)

  baseUrl = 'http://localhost:8080/api/general'

  addNewTask(task: Order){
    return this.http.post<Order>(`${this.baseUrl}/task`, task)
  }

  getAllTasks(page : number, size: number, name: string){
    return this.http.get<Order[]>(`http://localhost:8080/api/general/task/${page}/${size}?name=${name}`)
  }

}
