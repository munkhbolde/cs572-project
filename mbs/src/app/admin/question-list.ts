import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
	selector: 'question-list',
	encapsulation: ViewEncapsulation.None,
	template: `
	<admin-nav></admin-nav>
	<div class="admin container">
		<header class="title is-4">Question List</header>
		<hr class="hr"/>
		<table class="table is-fullwidth is-hoverable">
			<thead>
				<tr>
					<th>#</th>
					<th>Question</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th>#</th>
					<th>Question</th>
					<th>Status</th>
					<th></th>
				</tr>
			</tfoot>
			<tbody>
				<tr *ngFor="let q of questions; let i = index">
					<th class="w5">{{ i + 1 }}</th>
					<td>{{ q.question }}</td>
					<td class="has-text-weight-bold w10" [ngClass]="{enabled: 'has-text-success', disabled: 'has-text-danger'}[q.status]">{{ q.status }}</td>
					<td class="has-text-right w15" (click)="edit(q.question, q.status)">
						<span class="button">change status</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	`
})

export class QuestionList implements OnInit {
	title = 'Question List'
	url = 'http://localhost:8080/admin/questions/'
	questions = []

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.loadData()
	}

	loadData() {
		this.http.get(this.url).subscribe((res:any) => {
			this.questions = res.data
		})
	}

	edit(question, status) {
		if (!confirm('Do you really want to change status?'))
			return

		const data = {question: question, status: status === 'enabled'? 'disabled': 'enabled'}
		this.http.post(this.url, data).subscribe((res:any) => {
			this.loadData()
		})
	}
}
