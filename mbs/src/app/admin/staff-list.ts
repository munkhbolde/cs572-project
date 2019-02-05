import { Component , OnInit, ViewEncapsulation } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
	selector: 'staff-list',
	encapsulation: ViewEncapsulation.None,
	template: `
	<table class="table">
		<thead>
			<tr>
				<th>#</th>
				<th>User Name</th>
				<th>Type</th>
				<th></th>
			</tr>
		</thead>
		<tfoot>
			<tr>
				<th>ID</th>
				<th>User name</th>
				<th>Type</th>
				<th></th>
			</tr>
		</tfoot>
		<tbody>
			<tr *ngFor="let staff of staffs">
				<th>{{ staff._id }}</th>
				<td>{{ staff.name }}</td>
				<td>{{ staff.type }}</td>
				<td class="button is-text" (click)="edit(staff)"> edit</td>
			</tr>
		</tbody>
	</table>
	`
})
export class StaffList implements OnInit {
	title = 'Staff List'
	url = 'http://localhost:8080/admin/staffs'
	staffs = []
	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.http.get(this.url).subscribe((res:any) => {
			console.log(res)
			this.staffs = res.data
		})
	}

	edit(data) {
		console.log(data)
	}
}
