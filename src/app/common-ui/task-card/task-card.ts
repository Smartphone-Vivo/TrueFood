import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {Order} from '../../models/Order';

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

  @Input({required: true}) tasks!: Order[]

  ngOnChanges() {
    console.log('tasks', this.tasks)
  }

  answer() {

  }
}
