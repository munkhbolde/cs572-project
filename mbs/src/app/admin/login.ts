import { Component, ViewEncapsulation } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms'

@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.None,
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div class="field">
				<input
					class="input is-primary"
					type="text"
					formControlName="uname"
					placeholder="User name"
				/>
      </div>
      <div class="field">
				<input
					class="input is-primary"
					type="password"
					formControlName="password"
					placeholder="Password"
				/>
      </div>
      <div class="field">
				<input class="button is-primary" type="submit" value="login" />
      </div>
    </form>
  `,
})
export class AdminLogin {
  title = 'login'
  loginForm: FormGroup
	error = ''

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = formBuilder.group({
      uname: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    const form = {
      uname: this.loginForm.controls.uname.value,
      password: this.loginForm.controls.password.value
    }

    this.http.post('http://localhost:8080/login/', form).subscribe((data:any) => {
			localStorage.clear()
			if (data.success === false) {
				this.error = "user name password mismatch"
				return
			}

			localStorage['token'] = data.token
			const encrypted = data.token.split('.')[1]
			const decoded = JSON.parse(atob(encrypted))
			const url = '/' + decoded.type
			this.router.navigate([url])
    })
  }
}
