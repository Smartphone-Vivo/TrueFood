import { Component } from '@angular/core';
import {TaskCard} from '../../common-ui/task-card/task-card';

@Component({
  selector: 'app-my-tasks-page',
  imports: [
    TaskCard
  ],
  templateUrl: './my-tasks-page.html',
  styleUrl: './my-tasks-page.scss',
})
export class MyTasksPage {

}
