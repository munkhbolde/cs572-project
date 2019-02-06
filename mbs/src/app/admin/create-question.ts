import { Component, ViewEncapsulation } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
	FormGroup,
	FormControl,
	FormBuilder,
	Validators,
} from '@angular/forms'

@Component({
	selector: 'create-question',
	encapsulation: ViewEncapsulation.None,
	template: `
	<form [formGroup]='questionForm' (ngSubmit)="onSubmit()">
		<div class="field">
			<textarea class="input is-primary"
				placeholder="What do you want to ask?"
				formControlName="question">
			</textarea>
		</div>
		<div class="field">
			<input class="button is-primary" type="submit" value="create">
		</div>
	</form>
	`
})
export class CreateQuestion {
	title = 'Create new Question'
	questionForm: FormGroup
	url = 'http://localhost:8080/admin/create/question'

	constructor(private formBuilder: FormBuilder, private http: HttpClient) {
		this.questionForm = formBuilder.group({
			question: ['', Validators.required]
		})
	}

	onSubmit() {
		const data = {
			question: this.questionForm.controls.question.value
		}

		this.http.post(this.url, data).subscribe((res) => {
			console.log(res)
		})
	}
}
