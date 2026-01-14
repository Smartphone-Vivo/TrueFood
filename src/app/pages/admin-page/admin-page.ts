import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {TuiTable} from '@taiga-ui/addon-table';
import {FormsModule} from '@angular/forms';
import {TuiButton} from '@taiga-ui/core';
import {ProfileService} from '../../services/profile-service';
import {User} from '../../models/User';
import {ProfileCard} from '../../common-ui/profile-card/profile-card';
import {TuiPagination} from '@taiga-ui/kit';
import {Category} from '../../models/category';


@Component({
  selector: 'app-admin-page',
  imports: [TuiTable, FormsModule, ProfileCard, TuiButton, TuiPagination],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.scss',
})


export class AdminPage implements OnInit{

  profileService = inject(ProfileService)

  users: User[] = []

  cdr = inject(ChangeDetectorRef)

  length = 0
  index = 0
  currentPage = 0

  ngOnInit() {
    this.getAllUsers()

  }

  getAllUsers(){
    this.profileService.getAllUsers(this.index).subscribe(
      {
        next: (response: any) => {
          this.users = response.content

          this.length = response.totalPages
          this.index = response.number
          this.currentPage = response.number
          this.cdr.detectChanges()

          console.log(this.users)
        }
      }
    )
  }

  banControlUser(id: number | null) {
    this.profileService.banControlUser(id).subscribe()
    window.location.reload()
  }


  goToPage(index: number) {
    this.index = index
    this.getAllUsers()
  }


}
