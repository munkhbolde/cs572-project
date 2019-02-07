import { Component, ViewEncapsulation, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
	selector: 'answer',
	encapsulation: ViewEncapsulation.None,
	template: `
	<admin-nav></admin-nav>
	<div class="admin container">
		<header class="title is-4">Answer</header>
		<hr class="hr"/>
		<div class="answer" *ngFor="let a of answer; let i = index" >
				<h2 class="title is-6">
					{{ a.question}}
				</h2>

				<ace-editor [text]="a.answer" [theme]="'dracula'" [mode]="'java'" [options]="options" [readOnly]="false"
					[autoUpdateContent]="true" [durationBeforeCallback]="1000" (textChanged)="onChange($event)" style="min-height: 200px; width:100%; overflow: auto;">
				</ace-editor>
		</div>
	</div>
	`
})
export class Answer implements OnInit{
	title = 'Report'
	url = 'http://localhost:8080/admin/answer'
	email: string
	answer = []

	constructor(private ar: ActivatedRoute, private http: HttpClient, private router: Router) {}

	ngOnInit() {
		this.ar.queryParams.subscribe((params:any) => {
			this.email = params['email']
			this.http.post(this.url, {email: this.email}).subscribe((res:any) => {
				this.answer = res.data[0].students.answer
			})
		})
	}
}
