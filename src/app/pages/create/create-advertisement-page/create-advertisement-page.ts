import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {TuiButton, TuiError, TuiIcon, TuiTextfield} from '@taiga-ui/core';
import {
  TuiBadgeNotification,
  TuiChevron, TuiFieldErrorPipe,
  TuiFileLike,
  TuiFiles,
  tuiFilesAccepted, TuiSegmented,
  TuiSelect,
  TuiTextarea,
  TuiTextareaLimit
} from '@taiga-ui/kit';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn} from '@angular/forms';
import {form} from '@angular/forms/signals';
import {Order} from '../../../models/Order';
import {AdverticementService} from '../../../services/adverticement-service';
import {AsyncPipe} from '@angular/common';
import {Category} from '../../../models/category';
import {ImageService} from '../../../services/image-service';
import {TuiValidationError} from '@taiga-ui/cdk';
import {map} from 'rxjs';
import {Image} from '../../../models/Image';
import {TaskService} from '../../../services/task-service';
import {Router} from '@angular/router';

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
    TuiChevron,
    TuiError,
    TuiFieldErrorPipe,
    TuiIcon,
    TuiBadgeNotification,
    TuiSegmented
  ],
  templateUrl: './create-advertisement-page.html',
  styleUrl: './create-advertisement-page.scss',
  standalone: true
})
export class CreateAdvertisementPage implements OnInit{

  adverticementService = inject(AdverticementService)

  taskService = inject(TaskService)

  imageService = inject(ImageService)

  changeDetector = inject(ChangeDetectorRef)

  router = inject(Router)

  newAdvertisement = new Order()

  categories: Category[] = []

  imageUrl: string = ''

  createType = 'advertisement'

  ngOnInit() {
    this.getCategories()
  }

  setCreateionType(type: string){
    this.createType = type
    this.changeDetector.detectChanges()
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
  // protected readonly control = new FormControl<File>(null!);

  protected removeFile(): void {
    this.control.setValue(null);
  }

  addNewAdvertisement() {
    console.log('Новое объявление', this.newAdvertisement, this.control)

    this.newAdvertisement.categoryId = 3 //todo это убрать надо

    if (this.control.value) {
      console.log('control.value', this.control.value)
      this.imageService.addMultipleImages(this.control.value).subscribe(
        {
          next: (response: any) => {
            console.log('imageUrl',response)

            const imageUrls = response.map((item : any) => item.fileUrl)

            this.newAdvertisement.imagesId.imageUrls = imageUrls
            this.newAdvertisement.orderType = 'ADVERTISEMENT'
            console.log('newAdverticement', this.newAdvertisement)
            if(this.createType == 'advertisement'){
              this.adverticementService.addNewAdvertisement(this.newAdvertisement).subscribe()
              this.router.navigate(['advertisements'])
            }
            else{
              this.newAdvertisement.orderType = 'TASK'
              this.taskService.addNewTask(this.newAdvertisement).subscribe()
            }
          }
        }
      )
    }
  }

  addNewTask() {

  }

  protected readonly control = new FormControl<File[]>([], [maxFilesLength(5)]);
  protected readonly accepted$ = this.control.valueChanges.pipe(
    map(() => tuiFilesAccepted(this.control)),
  );

  protected rejected: readonly File[] = [];

  protected onReject(files: readonly File[]): void {
    this.rejected = Array.from(new Set(this.rejected.concat(files)));
  }

  protected onRemove(file: File): void {
    this.rejected = this.rejected.filter((rejected) => rejected !== file);
    this.control.setValue(
      this.control.value?.filter((current) => current !== file) ?? [],
    );
  }


}


export function maxFilesLength(maxLength: number): ValidatorFn {
  return ({value}: AbstractControl) =>
    value.length > maxLength
      ? {
        maxLength: new TuiValidationError(
          'Error: maximum limit - 5 files for upload',
        ),
      }
      : null;


}

