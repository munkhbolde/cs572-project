import { Component, ViewEncapsulation, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
	selector: 'report',
	encapsulation: ViewEncapsulation.None,
	template: `
	<admin-nav></admin-nav>
	<div class="admin container">
		<header class="title is-4">Student List</header>
		<hr class="hr"/>
		<table class="table is-fullwidth is-hoverable">
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Email</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Email</th>
					<th>Status</th>
					<th></th>
				</tr>
			</tfoot>
			<tbody>
				<tr *ngFor="let s of students; let i = index">
					<th class="w5">{{ i + 1 }}</th>
					<td>{{ s.name }}</td>
					<td>{{ s.email }}</td>
					<td class="has-text-weight-bold w10" [ngClass]="{sent: 'has-text-info', fail: 'has-text-danger', pass: 'has-text-success'}[s.status]">
						{{ s.status }}
					</td>
					<td class="has-text-right w15">
						<a class="button" [routerLink]="['/admin/answer']" [queryParams]="{email:s.email}" >check answer</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	`
})
export class Report implements OnInit{
	title = 'Report'
	students = []

	constructor(private http: HttpClient, private router: Router) {}

	ngOnInit() {
    this.http.get('http://localhost:8080/admin/report').subscribe((res:any) => {
			if (res.success === false)
				return

			this.students = res.data
    })
	}
}
