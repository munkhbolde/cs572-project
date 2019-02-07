import { Component, ViewEncapsulation } from '@angular/core'

@Component({
selector: 'admin-nav',
encapsulation: ViewEncapsulation.None,
template: `
<nav class="navbar is-dark">
	<div class="container">
	<div class="navbar-brand">
		<a class="navbar-item" href="https://bulma.io">
			<img src="https://bulma.io/images/bulma-logo-white.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
		</a>
	</div>

	<div class="navbar-menu">
		<div class="navbar-start">
			<a class="navbar-item" [routerLink]="['/admin/questions']">Questions</a>
			<a class="navbar-item" [routerLink]="['/admin/staffs']">Staffs</a>
			<a class="navbar-item" [routerLink]="['/admin/create/question']">Add Question</a>
			<a class="navbar-item" [routerLink]="['/admin/create/staff']">Add Staff</a>
		</div>

		<div class="navbar-end">
			<a class="navbar-item">Logout</a>
		</div>
	</div>
	</div>
</nav>
	`
})
export class Navbar {
title = 'navbar'
}
