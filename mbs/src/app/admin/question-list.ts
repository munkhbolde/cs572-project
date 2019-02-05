import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
	selector: 'question-list',
	encapsulation: ViewEncapsulation.None,
	template: `
	<table class="table">
		<thead>
			<tr>
				<th>#</th>
				<th>Question</th>
			</tr>
		</thead>
		<tfoot>
			<tr>
				<th>#</th>
				<th>Question</th>
			</tr>
		</tfoot>
		<tbody>
			<tr *ngFor="let q of questions; let i = index">
				<th>{{ i + 1 }}</th>
				<td>{{ q }}</td>
			</tr>
		</tbody>
	</table>
	`
})

export class QuestionList implements OnInit {
	title = 'Question List'
	url = 'http://localhost:8080/admin/questions/'
	questions = []

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.http.get(this.url).subscribe((res:any) => {
			console.log(res)
			this.questions = res.data
		})
	}
}
