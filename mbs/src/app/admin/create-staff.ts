import { Component, ViewEncapsulation } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import {
	FormGroup,
	FormControl,
	FormBuilder,
	Validators,
} from '@angular/forms'

@Component({
	selector: 'create-staff',
	encapsulation: ViewEncapsulation.None,
	template: `
	<admin-nav></admin-nav>
	<div class="admin">
		<div class="centered-form">
		<form class="form" [formGroup]="staffForm" (ngSubmit)="onSubmit()">
		<header class="title is-4">Add Staff</header>
		<hr class="hr"/>
			<div class="field">
				<input
					class="input is-info"
					type="text"
					formControlName="name"
					placeholder="Staff name"
				/>
			</div>
			<div class="field">
				<input
					class="input is-info"
					type="password"
					formControlName="password"
					placeholder="password"
					/>
			</div>
			<div class="field">
				<input
					class="button is-info"
					type="submit"
					value="create"/>
			</div>
		</form>
	</div>
	</div>
	`,
})
export class CreateStaff {
	title = 'Create staff'
	url = 'http://localhost:8080/admin/create/staff'
	staffForm: FormGroup

	constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
		this.staffForm = formBuilder.group({
			name: ['', Validators.required],
			password: ['', Validators.required],
		})
	}

	onSubmit() {
		const form = {
			name: this.staffForm.controls.name.value,
			password: this.staffForm.controls.password.value
		}

		this.http.post(this.url, form).subscribe((data:any) => {
			this.router.navigate(['/admin/staffs'])
		})
	}
}
