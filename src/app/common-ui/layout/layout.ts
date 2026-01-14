import {Component, inject} from '@angular/core';
import {Navbar} from '../navbar/navbar';
import {RouterOutlet} from '@angular/router';
import {AuthService} from '../../auth/auth-service';

@Component({
  selector: 'app-layout',
  imports: [
    Navbar,
    RouterOutlet
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

  authService = inject(AuthService)



}
