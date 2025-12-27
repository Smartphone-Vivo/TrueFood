import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {TuiButton, TuiTextfield} from '@taiga-ui/core';
import {TuiChevron, TuiFileLike, TuiFiles, TuiSelect, TuiTextarea, TuiTextareaLimit} from '@taiga-ui/kit';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {form} from '@angular/forms/signals';
import {Adverticement} from '../../../models/adverticement';
import {AdverticementService} from '../../../services/adverticement-service';
import {AsyncPipe} from '@angular/common';
import {Category} from '../../../models/category';

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
    AsyncPipe,
    TuiSelect,
    TuiChevron
  ],
  templateUrl: './create-advertisement-page.html',
  styleUrl: './create-advertisement-page.scss',
  standalone: true
})
export class CreateAdvertisementPage implements OnInit{

  categories: Category[] = []
  changeDetector = inject(ChangeDetectorRef)

  ngOnInit() {
    this.getCategories()
  }

  getCategories(){
    this.adverticementService.getCategories().subscribe(
      {
        next:(response: any) => {
          this.categories = response
          console.log('Категории', this.categories)
          this.changeDetector.detectChanges()
        }
      }
    )
  }

  protected groupItems: ReadonlyArray<readonly string[]> = [
    ['Caesar', 'Greek', 'Apple and Chicken'],
    ['Broccoli Cheddar', 'Chicken and Rice', 'Chicken Noodle'],
  ];

  protected readonly labels = ['Salad', 'Soup'];

  protected readonly categoryControl = new FormControl<string | null>(null);
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
