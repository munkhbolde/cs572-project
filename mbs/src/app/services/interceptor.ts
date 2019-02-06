import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class Interceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage['token']
		if (token != undefined) {
			const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
			return next.handle(authReq)
		}

		const json = req.clone({ headers: req.headers.set('Content-type', 'application/json') })
		return next.handle(json)
	}
}
