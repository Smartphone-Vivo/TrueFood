import {Component, inject} from '@angular/core';
import {TuiButton, TuiTextfield} from '@taiga-ui/core';
import {TuiFileLike, TuiFiles, TuiTextarea, TuiTextareaLimit} from '@taiga-ui/kit';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {form} from '@angular/forms/signals';
import {Adverticement} from '../../../models/adverticement';
import {AdverticementService} from '../../../services/adverticement-service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-create-advertisement-page',
  imports: [
    TuiTextfield,
    TuiTextarea,
    ReactiveFormsModule,
    TuiTextareaLimit,
    TuiButton,
    FormsModule,
    TuiFiles,
    AsyncPipe
  ],
  templateUrl: './create-advertisement-page.html',
  styleUrl: './create-advertisement-page.scss',
  standalone: true
})
export class CreateAdvertisementPage {

  protected readonly control = new FormControl<File | null>(null);

  protected removeFile(): void {
    this.control.setValue(null);
  }

  adverticementService = inject(AdverticementService)

  newAdverticement = new Adverticement()



  addNewAdverticement(){
    console.log('Новое объявление',this.newAdverticement, this.control)
    this.adverticementService.addNewAdverticement(this.newAdverticement).subscribe()
    if(this.control != null){
      this.adverticementService.uploadFile(this.control)
    }

  }


}
