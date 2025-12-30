import {Component, inject} from '@angular/core';
import {Register} from '../../../models/Register';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiAppearance, TuiButton, TuiTextfieldComponent} from '@taiga-ui/core';
import {TuiTextarea} from '@taiga-ui/kit';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth-service';
import {form, validate} from '@angular/forms/signals';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiTextarea,
    TuiTextfieldComponent,
    FormsModule
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {

  register: Register = new Register()
  authService = inject(AuthService)

  router = inject(Router)

  form = new FormGroup(
    {
      fio: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    }
  )

  registerUser() {
    if(this.form.valid){
      console.log('form value', this.form)
      this.authService.registerNewUser(this.form.value as any).subscribe()
      this.router.navigate(['/login'])
    }

  }

  toLoginPage() {
    this.router.navigate(['/login'])
  }


  onSubmit($event: any) {

  }
}
