import {Component, inject} from '@angular/core';
import {TuiAppearance, TuiButton, TuiTextfield, TuiTextfieldComponent} from '@taiga-ui/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiPassword, TuiTextarea} from '@taiga-ui/kit';
import {Login} from '../../../models/Login';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [
    TuiAppearance,
    ReactiveFormsModule,
    TuiTextarea,
    TuiTextfieldComponent,
    FormsModule,
    TuiButton,
    TuiTextfield,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

  login:Login = new Login()
  router = inject(Router)
  authService = inject(AuthService)

  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  loginUser(){
    console.log(this.authService.isAuth)
    if(this.form.valid){
      this.authService.login(this.form.value as any).subscribe(
        response => {
          if(response){

            this.router.navigate(['/advertisements', 1]).then(() => {
              // window.location.reload();
            })
            this.authService.isAuth

            console.log(this.authService.isAuth)
          }
        }
      )


    }
  }

  toRegisterPage(){
    this.router.navigate(['/register'])
  }

  protected value = '';

}
