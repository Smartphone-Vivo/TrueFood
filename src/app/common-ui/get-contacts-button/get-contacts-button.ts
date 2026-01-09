import {Component, inject, Input, numberAttribute, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TuiButton, TuiDialogService} from '@taiga-ui/core';
import {ProfileService} from '../../services/profile-service';
import {AuthService} from '../../auth/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-get-contacts-button',
  imports: [
    TuiButton
  ],
  templateUrl: './get-contacts-button.html',
  styleUrl: './get-contacts-button.scss',
})
export class GetContactsButton implements OnInit{

  profileService = inject(ProfileService)
  authService = inject(AuthService)

  private readonly dialogs = inject(TuiDialogService);

  router = inject(Router)

  contacts = 'asdas'

  @Input({transform: numberAttribute, required: true}) id!: number;

  ngOnInit() {
    console.log(this.contacts)
  }



  getContacts(){
    if (this.authService.isAuth){
      this.profileService.getUserContacts(this.id).subscribe({
        next: (response: any) => {
          this.contacts = response
          this.showDialog(response.contacts)
        }
      })
    }
    else{
      this.router.navigate(['login'])
    }

  }

  protected showDialog(contacts: string): void {
    this.dialogs
      .open(contacts, {
        label: 'Контакты пользователя:',
        size: 's'
      })
      .subscribe();
  }

}
