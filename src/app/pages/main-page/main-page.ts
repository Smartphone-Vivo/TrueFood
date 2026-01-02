import { Component } from '@angular/core';
import {MapCard} from '../../common-ui/map-card/map-card';
import {Search} from '../../common-ui/search/search';
import {
  YMapComponent,
  YMapDefaultFeaturesLayerDirective,
  YMapDefaultSchemeLayerDirective, YMapListenerDirective,
  YMapMarkerDirective
} from 'angular-yandex-maps-v3';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MapCard,
    Search,
    YMapComponent,
    YMapDefaultSchemeLayerDirective,
    YMapMarkerDirective,
    YMapDefaultFeaturesLayerDirective,
    YMapListenerDirective
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {

  onClick(){

  }

}
