import {Component, Input, OnInit} from '@angular/core';
import {TuiAppearance, TuiButton, TuiIcon} from '@taiga-ui/core';
import {Adverticement} from '../../models/adverticement';
import {TuiLike} from '@taiga-ui/kit';

@Component({
  selector: 'app-adverticement-card',
  imports: [
    TuiAppearance,
    TuiButton,
    TuiIcon,
    TuiLike
  ],
  templateUrl: './adverticement-card.html',
  styleUrl: './adverticement-card.scss',
  standalone: true
})
export class AdverticementCard implements OnInit{

  @Input({ required: true }) advertisement!: Adverticement;

  ngOnInit() {
  }





}
