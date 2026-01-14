import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TuiButton, TuiDialogService} from '@taiga-ui/core';

import {inject} from '@angular/core';
import {Router} from '@angular/router';

import {TuiActiveZone, TuiObscured} from '@taiga-ui/cdk';
import { TuiDropdown} from '@taiga-ui/core';
import {TuiChevron} from '@taiga-ui/kit';
import {AuthService} from '../../auth/auth-service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [
    TuiActiveZone,
    TuiButton,
    TuiChevron,
    TuiDropdown,
    TuiObscured,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class Navbar implements OnInit{

  authService = inject(AuthService)

  router : Router = inject(Router)

  cdr = inject(ChangeDetectorRef)

  protected openAdd = false;

  protected openProfile = false;



  ngOnInit(){
    this.isAuth()
    this.cdr.detectChanges()
  }

  isAuth(){
    return this.authService.isAuth
  }

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

  toLoginPage(){
    this.router.navigate(['/login'])
  }

  toMainPage(){
    console.log('to main')
    this.router.navigate(['/main'])
  }

  toAdvertisementPage(){
    console.log('to main')
    this.router.navigate(['/advertisements', 1])
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
    if(this.isAuth()){
      console.log('to main')
      this.router.navigate(['/favorite'])
    }
    else{
      this.toLoginPage()
    }
  }

  toCreateAdvertisementPage(){
    if(this.isAuth()) {
      console.log('to main')
      this.router.navigate(['/newadvertisement'])
      this.openAdd = false;
    }else{
      this.toLoginPage()
    }
  }

  toProfilePage(){
    console.log('to profile', this.authService.getMe())
    this.router.navigate(['/profile', this.authService.getMe()])
    this.openProfile = false;
  }

  toMyAdvertisementsPage(){
    console.log('to main')
    this.router.navigate(['/myadvertisements'])
    this.openProfile = false;
  }

  toMyTasksPage(){
    console.log('to main')
    this.router.navigate(['/mytasks'])
    this.openProfile = false;
  }

  logout() {
    this.authService.logout()
    this.cdr.detectChanges()
    this.router.navigate(['/advertisements', 1]).then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 200)
    })

  }
}
