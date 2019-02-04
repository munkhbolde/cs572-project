import { Component, ViewEncapsulation } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms"

@Component({
  selector: "app-login",
  encapsulation: ViewEncapsulation.None,
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            formControlName="uname"
            placeholder="User name"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="password"
            formControlName="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input class="button is-primary" type="submit" value="login" />
        </div>
      </div>
    </form>
  `,
})
export class AdminLogin {
  title = "login";
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.loginForm = formBuilder.group({
      uname: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit() {
    const form = {
      uname: this.loginForm.controls.uname.value,
      password: this.loginForm.controls.password.value
    };

    this.http.post("http://home:8080/login/", form).subscribe((data:any) => {
			localStorage.clear()
      if (data.success) localStorage["token"] = data.token;
    });
  }
}
