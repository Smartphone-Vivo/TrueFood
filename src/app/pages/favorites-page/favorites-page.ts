import { Component } from '@angular/core';

import {ChangeDetectionStrategy} from '@angular/core';


@Component({
  standalone: true,
  selector: 'app-favorites-page',
  imports: [],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPage {

}

