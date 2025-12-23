import {Component, Input, OnInit} from '@angular/core';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {Adverticement} from '../../models/adverticement';

@Component({
  selector: 'app-adverticement-card',
  imports: [
    TuiAppearance,
    TuiButton
  ],
  templateUrl: './adverticement-card.html',
  styleUrl: './adverticement-card.scss',
})
export class AdverticementCard implements OnInit{

  @Input({ required: true }) advertisement!: Adverticement;

  ngOnInit() {
  }





}
