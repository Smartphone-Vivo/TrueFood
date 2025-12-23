import { Component } from '@angular/core';
import {MapCard} from '../../common-ui/map-card/map-card';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MapCard
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {

}
