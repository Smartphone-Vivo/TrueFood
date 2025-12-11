import { TuiRoot } from "@taiga-ui/core";
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './common-ui/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TuiRoot
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}

