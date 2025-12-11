import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';

import {inject} from '@angular/core';
import {Router} from '@angular/router';

import {TuiActiveZone, TuiObscured} from '@taiga-ui/cdk';
import { TuiDropdown} from '@taiga-ui/core';
import {TuiChevron} from '@taiga-ui/kit';
import {CreateAdvertisementPage} from '../../pages/create/create-advertisement-page/create-advertisement-page';
import {CreateTaskPage} from '../../pages/create/create-task-page/create-task-page';
import {ProfilePage} from '../../pages/profile-page/profile-page';
import {MyTasksPage} from '../../pages/my-tasks-page/my-tasks-page';

@Component({
  selector: 'app-navbar',
  imports: [
    TuiActiveZone,
    TuiButton,
    TuiChevron,
    TuiDropdown,
    TuiObscured
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {

  router : Router = inject(Router)

  protected openAdd = false;

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


  protected onClickAdd(): void {
    this.openAdd = !this.openAdd;
  }

  protected onObscuredAdd(obscured: boolean): void {
    if (obscured) {
      this.openAdd = false;
    }
  }

  protected onActiveZoneAdd(active: boolean): void {
    this.openAdd = active && this.openAdd;
  }


  toMainPage(){
    console.log('to main')
    this.router.navigate(['/main'])
  }

  toAdvertisementPage(){
    console.log('to main')
    this.router.navigate(['/advertisements'])
  }

  toFeedPage(){
    console.log('to main')
    this.router.navigate(['/feed'])
  }

  toTasksPage(){
    console.log('to main')
    this.router.navigate(['/tasks'])
  }

  toFavoritePage(){
    console.log('to main')
    this.router.navigate(['/favorite'])
  }

  toCreateAdvertisementPage(){
    console.log('to main')
    this.router.navigate(['/newadvertisement'])
    this.openAdd = false;
  }

  toCreateTaskPage(){
    console.log('to main')
    this.router.navigate(['/newtask'])
    this.openAdd = false;
  }

  toProfilePage(){
    console.log('to main')
    this.router.navigate(['/profile'])
    this.openProfile = false;
  }

  toMyTasksPage(){
    console.log('to main')
    this.router.navigate(['/mytasks'])
    this.openProfile = false;
  }

}
