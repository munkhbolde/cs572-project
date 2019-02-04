import { Component, ViewEncapsulation } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
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
		<form [formGroup]="staffForm" (ngSubmit)="onSubmit()">
			<div class="field">
				<input
					class="input is-primary"
					type="text"
					formControlName="name"
					placeholder="Staff name"
				/>
			</div>
			<div class="field">
				<input
					class="input is-primary"
					type="password"
					formControlName="password"
					placeholder="password"
					/>
			</div>
			<div class="field">
				<input
					class="button is-primary"
					type="submit"
					value="create"/>
			</div>
		</form>
	`,
})
export class StaffCreate {
	title = 'Create staff'
	url = 'http://home:8080/admin/create/staff'
	staffForm: FormGroup

	constructor(private formBuilder: FormBuilder, private http: HttpClient) {
		this.staffForm = formBuilder.group({
			name: ["", Validators.required],
			password: ["", Validators.required],
		})
	}

	onSubmit() {
		const form = {
			name: this.staffForm.controls.name.value,
			password: this.staffForm.controls.password.value
		}

		this.http.post(this.url, form).subscribe((data:any) => {
			console.log(data)
		})
	}
}
