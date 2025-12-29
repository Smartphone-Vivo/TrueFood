import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {TuiButton, TuiError, TuiTextfield} from '@taiga-ui/core';
import {
  TuiChevron, TuiFieldErrorPipe,
  TuiFileLike,
  TuiFiles,
  tuiFilesAccepted,
  TuiSelect,
  TuiTextarea,
  TuiTextareaLimit
} from '@taiga-ui/kit';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn} from '@angular/forms';
import {form} from '@angular/forms/signals';
import {Adverticement} from '../../../models/adverticement';
import {AdverticementService} from '../../../services/adverticement-service';
import {AsyncPipe} from '@angular/common';
import {Category} from '../../../models/category';
import {ImageService} from '../../../services/image-service';
import {TuiValidationError} from '@taiga-ui/cdk';
import {map} from 'rxjs';
import {Image} from '../../../models/Image';

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
    TuiFieldErrorPipe
  ],
  templateUrl: './create-advertisement-page.html',
  styleUrl: './create-advertisement-page.scss',
  standalone: true
})
export class CreateAdvertisementPage implements OnInit{

  adverticementService = inject(AdverticementService)

  imageService = inject(ImageService)

  changeDetector = inject(ChangeDetectorRef)

  newAdverticement = new Adverticement()

  categories: Category[] = []

  imageUrl: string = ''

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
  // protected readonly control = new FormControl<File>(null!);

  protected removeFile(): void {
    this.control.setValue(null);
  }

  addNewAdverticement() {
    console.log('Новое объявление', this.newAdverticement, this.control)

    this.newAdverticement.categoryId = 1

    if (this.control.value) {
      console.log('control.value', this.control.value)
      this.imageService.addImage(this.control.value).subscribe(
        {
          next: (response: any) => {
            console.log('imageUrl',response)

            const imageUrls = response.map((item : any) => item.fileUrl)

            this.newAdverticement.imagesId.imageUrls = imageUrls
            console.log('newAdverticement', this.newAdverticement)
            this.adverticementService.addNewAdverticement(this.newAdverticement).subscribe()
          }
        }
      )
    }
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

