import { Component } from '@angular/core';
import {TuiAppearance, TuiButton, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {
  YMapComponent,
  YMapDefaultFeaturesLayerDirective, YMapDefaultMarkerDirective,
  YMapDefaultSchemeLayerDirective, YMapMarkerDirective
} from 'angular-yandex-maps-v3';

@Component({
  selector: 'app-map-card',
  imports: [
    TuiAppearance,
    TuiCardLarge,
    YMapComponent,
    YMapDefaultFeaturesLayerDirective,
    YMapDefaultSchemeLayerDirective,
    YMapMarkerDirective,
    YMapDefaultMarkerDirective,
  ],
  templateUrl: './map-card.html',
  styleUrl: './map-card.scss',
})
export class MapCard {

}
