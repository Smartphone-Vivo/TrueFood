import { Component } from '@angular/core';
import {MapCard} from '../../common-ui/map-card/map-card';
import {Search} from '../../common-ui/search/search';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MapCard,
    Search
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {

}
