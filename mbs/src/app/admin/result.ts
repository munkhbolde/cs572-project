import { Component, ViewEncapsulation, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
	selector: 'result',
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
					<th>Name</th>
					<th>email</th>
					<th>status</th>
					<th></th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>email</th>
					<th>status</th>
					<th></th>
				</tr>
			</tfoot>
			<tbody>
				<tr *ngFor="let q of students; let i = index">
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
export class Result implements OnInit{
	title = 'Result'

	constructor(private http: HttpClient) {}

	ngOnInit() {
    this.http.get('http://localhost:8080/admin/result').subscribe((data:any) => {
			if (data.success === false) {
				return
			}
    })
	}
}
