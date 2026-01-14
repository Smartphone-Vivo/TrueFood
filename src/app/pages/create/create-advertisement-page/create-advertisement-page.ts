import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {TuiButton, TuiDataList, TuiError, TuiIcon, TuiTextfield} from '@taiga-ui/core';
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
import {Advertisement} from '../../../models/Advertisement';
import {AdvertisementService} from '../../../services/advertisement-service';
import {AsyncPipe} from '@angular/common';
import {Category} from '../../../models/category';
import {ImageService} from '../../../services/image-service';
import {TuiValidationError} from '@taiga-ui/cdk';
import {map} from 'rxjs';
import {TaskService} from '../../../services/task-service';
import {Router} from '@angular/router';
import {CategoryService} from '../../../services/category-service';
import {AuthService} from '../../../auth/auth-service';

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
    TuiSegmented,
    TuiDataList
  ],
  templateUrl: './create-advertisement-page.html',
  styleUrl: './create-advertisement-page.scss',
  standalone: true
})
export class CreateAdvertisementPage implements OnInit{

  advertisementService = inject(AdvertisementService)
  categoryService = inject(CategoryService)
  taskService = inject(TaskService)
  imageService = inject(ImageService)
  authService = inject(AuthService)

  changeDetector = inject(ChangeDetectorRef)

  router = inject(Router)

  newAdvertisement = new Advertisement()

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

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response;
        console.log('Категории', this.categories);
        this.groupCategories();
        this.changeDetector.detectChanges();
      }
    });
  }

  protected labels: string[] = [];

  groupCategories() {

    const level2Categories = this.categories.filter(cat => cat.parent?.id === 1)

    this.labels = level2Categories.map(cat => cat.name)

    this.groupItems = level2Categories.map(parentCat =>
      this.categories
        .filter(cat => cat.parent?.id === parentCat.id)
        .map(cat => cat.name)
    )
  }


  protected groupItems: ReadonlyArray<readonly string[]> = [[], []];

  protected readonly categoryControl = new FormControl<string | null>(null);

  protected removeFile(): void {
    this.control.setValue(null);
  }

  getCategoryByName(categoryaName: string | null): number | null{
    return this.categories.filter(cat => cat.name === categoryaName)
      .map(
        cat => cat.id
      )[0]
  }

  addNewAdvertisement() {
    console.log('Новое объявление', this.newAdvertisement, this.control, this.categoryControl)

    this.newAdvertisement.categoryId = this.getCategoryByName(this.categoryControl.value) //todo это убрать надо

    this.newAdvertisement.authorId = Number(this.authService.getMe())

    console.log('выбранная категория', this.categoryControl.value, this.getCategoryByName(this.categoryControl.value))

    if (this.control.value) {
      console.log('control.value', this.control.value)
      this.imageService.addMultipleImages(this.control.value).subscribe(
        {
          next: (response: any) => {
            console.log('imageUrl',response)

            const imageUrls = response.map((item : any) => item.fileUrl)

            this.newAdvertisement.images.imageUrls = imageUrls
            console.log('newAdverticement', this.newAdvertisement)
            if(this.createType == 'advertisement'){
              this.advertisementService.addNewAdvertisement(this.newAdvertisement).subscribe()
              this.router.navigate(['advertisements', 1])
            }
            else{
              this.taskService.addNewTask(this.newAdvertisement).subscribe()
              this.router.navigate(['tasks'])
            }
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

