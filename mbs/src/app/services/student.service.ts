import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private submitUrl = "http://localhost:8080/submit";
  constructor(private http: HttpClient) { }

  submitAnswer(exam, email) {
    return this.http.post<any>(this.submitUrl, { exam: exam, email: email });
  }

}
