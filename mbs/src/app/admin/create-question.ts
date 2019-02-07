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
	selector: 'create-question',
	encapsulation: ViewEncapsulation.None,
	template: `
	<admin-nav></admin-nav>
	<div class="admin container">
		<header class="title is-4">Create question</header>
		<hr class="hr"/>
		<form [formGroup]='questionForm' (ngSubmit)="onSubmit()">
			<div class="field">
				<textarea class="input is-info"
					placeholder="What do you want to ask?"
					formControlName="question">
				</textarea>
			</div>
			<div class="field">
				<input class="button is-info" type="submit" value="create">
				</div>
			</form>
		</div>
		`
})
export class CreateQuestion {
	title = 'Create new Question'
	questionForm: FormGroup
	url = 'http://localhost:8080/admin/create/question'

	constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
		this.questionForm = formBuilder.group({
			question: ['', Validators.required]
		})
	}

	onSubmit() {
		const data = {
			question: this.questionForm.controls.question.value
		}

		this.http.post(this.url, data).subscribe((res) => {
			this.router.navigate(['/admin/questions'])
		})
	}
}
