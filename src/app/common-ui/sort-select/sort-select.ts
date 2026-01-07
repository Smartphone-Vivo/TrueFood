import {Component, EventEmitter, Output} from '@angular/core';
import {TuiButton, TuiDropdown} from "@taiga-ui/core";
import {TuiChevron} from "@taiga-ui/kit";
import {TuiActiveZone, TuiObscured} from '@taiga-ui/cdk';

@Component({
  selector: 'app-sort-select',
  imports: [
    TuiButton,
    TuiChevron,
    TuiDropdown,
    TuiObscured,
    TuiActiveZone
  ],
  templateUrl: './sort-select.html',
  styleUrl: './sort-select.scss',
})
export class SortSelect {

  @Output() value: EventEmitter<string> = new EventEmitter<string>()

  protected openProfile = false;

  protected onClickProfile(): void {
    this.openProfile = !this.openProfile;
  }

  protected onObscuredProfile(obscured: boolean): void {
    if (obscured) {
      this.openProfile = false;
    }
  }

  protected onActiveZoneProfile(active: boolean): void {
    this.openProfile = active && this.openProfile;
  }

  toDorogo() {
    this.value.emit('price,desc') //todo поменять
  }

  toDeshevo() {
    this.value.emit('price,asc') //todo поменять
  }

  toDate() {
    this.value.emit('createdAt,desc')
  }
}
