import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {ProfileService} from '../../services/profile-service';
import {User} from '../../models/User';
import {TuiAvatar, TuiPagination, TuiRating, TuiSegmented} from '@taiga-ui/kit';
import {FormsModule} from '@angular/forms';
import {AdvertisementsPage} from '../advertisements-page/advertisements-page';
import {AdverticementService} from '../../services/adverticement-service';
import {Order} from '../../models/Order';
import {AdverticementCard} from '../../common-ui/adverticement-card/adverticement-card';
import {TuiButton, TuiLoader} from '@taiga-ui/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReviewCard} from '../../common-ui/review-card/review-card';
import {Review} from '../../models/Review';
import {TaskService} from '../../services/task-service';
import {Task} from '../../models/Task';
import {TaskCard} from '../../common-ui/task-card/task-card';

@Component({
  selector: 'app-profile-page',
  imports: [
    TuiAvatar,
    TuiRating,
    FormsModule,
    AdverticementCard,
    TuiPagination,
    ReviewCard,
    TuiButton,
    TuiSegmented,
    TaskCard
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit{

  authService = inject(AuthService)
  profileService = inject(ProfileService)
  advertisementService = inject(AdverticementService)
  taskService = inject(TaskService)
  router = inject(Router)

  advertisements: Order[] = []
  tasks: Task[] = []

  cdr = inject(ChangeDetectorRef)

  route = inject(ActivatedRoute)

  user: User = new User()

  protected length = 12

  protected index = 0

  currentPage = 0

  currentPath : number| null = null

  reviews: Review[] = []

  totalOrders: number = 0

  orderType = 'advertisement'

  ngOnInit() {
    this.getCurrentPath()
    console.log('activated route', this.currentPath)
    this.authService.getMe()
    this.getProfile()
    this.getAdvertisementsByUser()
  }

  getCurrentPath(){
    this.route.params.subscribe(params => {
      this.currentPath = params['id'];
    })
  }

  getProfile(){
    this.profileService.getProfile(this.currentPath).subscribe({
        next: (response) => {
          this.user = response
          this.reviews = response.reviews
          console.log('profile-reviews', this.reviews)
          this.cdr.detectChanges()
        }
      })
  }

  getAdvertisementsByUser(){
    this.advertisementService.getAdvertisementsByUser(this.currentPath, this.index)
      .subscribe({
        next: (response: any) => {
          console.log('объявления', response)
          this.advertisements = response.content
          this.length = response.totalPages
          this.index = response.number
          this.currentPage = response.number
          this.totalOrders = response.totalElements
          this.cdr.detectChanges()
        }
      }

    )
  }

  getTasksByUser(){
    this.taskService.getUserTask(this.currentPath).subscribe({
      next: (response: any) => {
        console.log('таски', response)
        this.tasks = response.content
        this.length = response.totalPages
        this.index = response.number
        this.currentPage = response.number
        this.totalOrders = response.totalElements
        this.cdr.detectChanges()
    }
    })
  }

  toAdvertisement(id: number | null) {
    this.router.navigate(['/advertisement', id])
  }

  protected goToPage(index: number): void {
    this.index = index;
    console.info('New page:', index);
    this.getAdvertisementsByUser()

  }

  toContacts() {

  }

  setCreateionType(orderType: string) {
    this.orderType = orderType
    if(orderType == 'advertisement'){
      this.getAdvertisementsByUser()
    }else{
      this.getTasksByUser()
    }
    this.cdr.detectChanges()
  }
}
