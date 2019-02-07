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

		switch (this.role) {
			case "login":
				return true;
				break;
			default:
				return true;
		}
	}

	navigate() {
		this.router.navigate(['/login'])
		return false
	}

}
