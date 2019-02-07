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
		<div class="controller">
			<span class="has-text-weight-bold"> answer: </span>
			<span class="button is-info" (click)="changeAnswer(0)">1</span>
			<span class="button is-info" (click)="changeAnswer(1)">2</span>
			<span class="button is-info" (click)="changeAnswer(2)">3</span>
			<span class="button is-warning" (click)="snapshot(shot)">snapshot</span>
			<span class="has-text-weight-bold">grade:</span>
			<span class="button is-success" (click)="mark('pass')">pass</span>
			<span class="button is-danger" (click)="mark('fail')">fail</span>
		</div>
		<hr class="hr"/>
			<h2 class="title is-6">
				{{ question }}
			</h2>

			<ace-editor [text]="current" [theme]="'dracula'" [mode]="'java'" [options]="options" [readOnly]="false"
				[autoUpdateContent]="true" [durationBeforeCallback]="1000" style="min-height: 200px; width:100%; overflow: auto;">
			</ace-editor>
	</div>
	`
})
export class Answer implements OnInit{
	title = 'Report'
	url = 'http://localhost:8080/admin/answer'
	current: string
	email: string
	answer = []
	i = 0
	shot = false
	question = ''

	constructor(private ar: ActivatedRoute, private http: HttpClient, private router: Router) {}

	ngOnInit() {
		this.ar.queryParams.subscribe((params:any) => {
			this.email = params['email']
			this.http.post(this.url, {email: this.email}).subscribe((res:any) => {
				this.answer = res.data[0].students.answer
				this.current = this.answer[0].answer
				this.question = this.answer[this.i].question
			})
		})
	}

	snapshot(l) {
		let step = 1
		this.answer[this.i].snapshot.forEach(data => {
			this.changeShot()

			if (this.shot == false)
				return

			setTimeout(() => {
				this.current = data
				console.log(this.current)
			}, step * 500)
			step =  step + 1
		})

	}

	changeShot() {
		this.shot = true
	}

	changeAnswer(e) {
		this.shot = false
		this.i = e
		this.current = this.answer[this.i].answer
		this.question = this.answer[this.i].question
	}

	mark(grade) {
		this.http.patch(this.url, {email: this.email, grade: grade}).subscribe((res:any) => {
			this.router.navigate(['/admin/report'])
		})
	}
}
