import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from "@angular/common/http"

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	decoded: any
	role: string
	constructor(private router: Router, private http: HttpClient) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		this.role = location.pathname.split("/")[1]

		if (localStorage['token'] === undefined) {
			return this.navigate()
		}

		const encrypted = localStorage['token'].split('.')[1]
		this.decoded = JSON.parse(atob(encrypted))

		if (this.role === 'login')
			return true;

		if (this.decoded.type !== this.role)
			return this.navigate();

		// if (this.role === 'start')
		// 	return this.checkStudent()

		return true;
	}

	navigate() {
		this.router.navigate(['/login'])
		return false
	}

	checkStudent() {
		let url = "http://localhost:8080/checkStudent" + location.search;
		let resp = false;
		this.http.get(url).subscribe((res: any) => {
			if (res.success) {
				console.log(res.success);
				return resp = true;
			}
		});
		return resp;
	}
}
