import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
		decoded: any
		role: string
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
			this.role = location.pathname.split("/")[1]

			if (localStorage['token'] === undefined) {
				console.log('bandi')
				return this.navigate()
			}

			const encrypted = localStorage['token'].split('.')[1]
			this.decoded = JSON.parse(atob(encrypted))

			if (this.decoded.type !== this.role)
				return this.navigate()
			return true
    }

		navigate() {
			this.router.navigate(['/login'])
			return false
		}
}
