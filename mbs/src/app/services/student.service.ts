import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private submitUrl = "http://localhost:8080/submit";
  private checkUrl = "http://localhost:8080/checkStudent";
  private startUrl = "http://localhost:8080/start";

  constructor(private http: HttpClient) { }

  submitAnswer(exam, email) {
    return this.http.post<any>(this.submitUrl, { exam: exam, email: email });
  }

  checkStudent(urlQuery) {
    return this.http.get<any>(this.checkUrl + urlQuery);
  }

  fetchQuestions() {
    return this.http.get<any>(this.startUrl);
  }

}
