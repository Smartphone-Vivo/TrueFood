import {Component, inject} from '@angular/core';
import {TuiButton, TuiTextfield} from '@taiga-ui/core';
import {TuiTextarea, TuiTextareaLimit} from '@taiga-ui/kit';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {form} from '@angular/forms/signals';
import {Adverticement} from '../../../models/adverticement';
import {AdverticementService} from '../../../services/adverticement-service';

@Component({
  selector: 'app-create-advertisement-page',
  imports: [
    TuiTextfield,
    TuiTextarea,
    ReactiveFormsModule,
    TuiTextareaLimit,
    TuiButton,
    FormsModule
  ],
  templateUrl: './create-advertisement-page.html',
  styleUrl: './create-advertisement-page.scss',
})
export class CreateAdvertisementPage {

  adverticementService = inject(AdverticementService)

  newAdverticement = new Adverticement()



  addNewAdverticement(){
    console.log('Новое объявление',this.newAdverticement)
    this.adverticementService.addNewAdverticement(this.newAdverticement).subscribe()
  }

}
