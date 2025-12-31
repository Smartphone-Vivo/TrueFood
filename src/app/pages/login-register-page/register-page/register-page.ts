import {Component, inject} from '@angular/core';
import {Register} from '../../../models/Register';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiAppearance, TuiButton, TuiTextfieldComponent} from '@taiga-ui/core';
import {TuiFileLike, TuiFiles, TuiTextarea} from '@taiga-ui/kit';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth-service';
import {form, validate} from '@angular/forms/signals';
import {finalize, map, Observable, of, Subject, switchMap, timer} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ImageService} from '../../../services/image-service';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiTextarea,
    TuiTextfieldComponent,
    FormsModule,
    TuiFiles,
    AsyncPipe
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {

  register: Register = new Register()
  authService = inject(AuthService)
  imageService = inject(ImageService)
  router = inject(Router)

  form = new FormGroup(
    {
      fio: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      imagesId: new FormControl(null),
    }
  )

  registerUser() {
    console.log(this.form.valid)
    if(this.form.valid){
      console.log('form value', this.form)

      if(this.control.value){
        this.imageService.addOneImage(this.control.value).subscribe(
          {
            next: (response: any) => {
              const firstItem = response[0];
              const fileUrl = firstItem.fileUrl;

              console.log('fileUrl', fileUrl)
              console.log('fileUrl', fileUrl)

              const userData = {
                ...this.form.value,
                fileUrl: fileUrl
              }

              this.authService.registerNewUser(userData as any).subscribe()
              this.router.navigate(['/login'])
            }

          }
        )
      }


    }

  }

  toLoginPage() {
    this.router.navigate(['/login'])
  }

  protected readonly control = new FormControl<File | null>(
    null,
    Validators.required,
  );

  protected readonly failedFiles$ = new Subject<File | null>();
  protected readonly loadingFiles$ = new Subject<File | null>();
  protected readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap((file) => this.processFile(file)),
  );

  protected removeFile(): void {
    this.control.setValue(null);
  }

  protected processFile(file: TuiFileLike | null): Observable<File | null> {
    this.failedFiles$.next(null);

    if (this.control.invalid || !file) {
      return of(null);
    }

    return of(file as File);
  }


}
