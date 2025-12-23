import { Component } from '@angular/core';
import {TuiAppearance, TuiButton, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';

@Component({
  selector: 'app-map-card',
  imports: [
    TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    TuiButton
  ],
  templateUrl: './map-card.html',
  styleUrl: './map-card.scss',
})
export class MapCard {

}
