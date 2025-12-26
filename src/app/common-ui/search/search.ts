import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TuiButton, TuiTextfield} from '@taiga-ui/core';
import {FormsModule} from '@angular/forms';
import {TuiChevron, TuiTextarea} from '@taiga-ui/kit';

@Component({
  selector: 'app-search',
  imports: [
    TuiTextfield,
    FormsModule,
    TuiTextarea,
    TuiButton,
    TuiChevron
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
  standalone: true
})
export class Search {

  @Output() searchValue = new EventEmitter<string>()

  value: string = ''

  search(){
    this.searchValue.emit(this.value)
  }
}
