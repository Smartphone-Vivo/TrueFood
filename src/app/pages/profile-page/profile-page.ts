import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {ProfileService} from '../../services/profile-service';
import {User} from '../../models/User';
import {TuiAvatar, TuiPagination, TuiRating} from '@taiga-ui/kit';
import {FormsModule} from '@angular/forms';
import {AdvertisementsPage} from '../advertisements-page/advertisements-page';
import {AdverticementService} from '../../services/adverticement-service';
import {Adverticement} from '../../models/adverticement';
import {AdverticementCard} from '../../common-ui/adverticement-card/adverticement-card';
import {TuiLoader} from '@taiga-ui/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [
    TuiAvatar,
    TuiRating,
    FormsModule,
    AdverticementCard,
    TuiLoader,
    TuiPagination
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit{

  authService = inject(AuthService)
  profileService = inject(ProfileService)
  advertisementService = inject(AdverticementService)
  router = inject(Router)

  advertisements: Adverticement[] = []

  cdr = inject(ChangeDetectorRef)

  user: User = new User()

  currentId: any = this.authService.getMe()

  protected length = 12

  protected index = 0

  currentPage = 0

  ngOnInit() {
    this.authService.getMe()
    this.getMyProfile()
    this.getAdvertisementsByUser()
  }


  getMyProfile(){
    this.profileService.getMyProfile().subscribe(
      response => {
        this.user = response
        this.cdr.detectChanges()
      }
    )
  }

  getAdvertisementsByUser(){
    this.advertisementService.getAdvertisementsByUser(this.currentId, this.index)
      .subscribe({
        next: (response: any) => {
          this.advertisements = response.content
          this.length = response.totalPages
          this.index = response.number
          this.currentPage = response.number
          this.cdr.detectChanges()
        }
      }

    )
  }

  toAdvertisement(id: number | null) {
    this.router.navigate(['/advertisement', id])
  }

  protected goToPage(index: number): void {
    this.index = index;
    console.info('New page:', index);
    this.getAdvertisementsByUser()

  }
}
