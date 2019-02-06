import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffserviceService {
  private userinfourl = 'http://localhost:8080/students'
  private sendemailurl = 'http://localhost:8080/sendemail'
  private sendinvitationurl = 'http://localhost:8080/invitation'

  constructor(private http: HttpClient) { }
  getstudentinfo() {
    return this.http.get<any>(this.userinfourl)
  }
  sendemail(email, state) {
    return this.http.post<any>(this.sendemailurl, { "email": email, "status": state })
  }
  sendinvitation(email) {
    return this.http.post<any>(this.sendinvitationurl, { "email": email })
  }
}
