import { Component , OnInit, ViewEncapsulation } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
	selector: 'staff-list',
	encapsulation: ViewEncapsulation.None,
	template: `
	<admin-nav></admin-nav>
	<div class="admin container">
	<header class="title is-4">Staff List</header>
	<hr class="hr"/>
	<table class="table is-fullwidth is-hoverable">
		<thead>
			<tr>
				<th>#</th>
				<th>User Name</th>
				<th>Type/Status</th>
				<th></th>
				<th></th>
			</tr>
		</thead>
		<tfoot>
			<tr>
				<th>ID</th>
				<th>User name</th>
				<th>Type</th>
				<th></th>
				<th></th>
			</tr>
		</tfoot>
		<tbody>
			<tr *ngFor="let staff of staffs; let i = index">
				<th>{{ i }}</th>
				<td>{{ staff.name }}</td>
				<td>{{ staff.type }}</td>
				<td class="has-text-info" (click)="edit(staff)">change status</td>
				<td class="has-text-danger" (click)="delete(staff.name)">delete</td>
			</tr>
		</tbody>
	</table>
</div>
	`
})
export class StaffList implements OnInit {
	title = 'Staff List'
	url = 'http://localhost:8080/admin/staffs'
	staffs = []
	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.loadData()
	}

	loadData() {
		this.http.get(this.url).subscribe((res:any) => {
			console.log(res)
			this.staffs = res.data
		})
	}

	edit(staff) {
		if (!confirm("Do you want to activate or disable status"))
			return

		const data = {
			name: staff.name,
			type: staff.type === 'staff' ? 'disabled-staff' : 'staff'
		}

		this.http.patch(this.url, data).subscribe((res:any) => {
			console.log(res)
			this.loadData()
		})
	}

	delete(name) {
		if (!confirm("Do you want to delete this staff"))
			return

		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
			body: {name: name},
		}

		this.http.delete(this.url, options).subscribe((res: any) => {
			if(res.success)
				this.loadData()
		})
	}
}
