import {ChangeDetectorRef, Component, inject, Input, numberAttribute, OnChanges, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile-service';
import {required} from '@angular/forms/signals';
import {User} from '../../models/User';
import {TuiAvatar, TuiRating} from '@taiga-ui/kit';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-card',
  imports: [
    TuiAvatar,
    TuiRating,
    FormsModule
  ],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard implements OnChanges{

  profileService = inject(ProfileService)
  router = inject(Router)
  cdr = inject(ChangeDetectorRef)
  user: User = new User()

  ngOnChanges(){
    this.getUserProfile()
  }

  @Input({transform: numberAttribute, required: true}) id!: number;

  getUserProfile(){
    this.profileService.getProfile(this.id).subscribe({
      next:(response) => {
        this.user = response
        console.log('пользовательddd', this.user)
        this.cdr.detectChanges()
      }
      }

    )

  }

  toProfile() {
    this.router.navigate(['profile', this.user.id])
  }
}
