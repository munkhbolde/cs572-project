import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferDataService } from '../../services/transfer-data.service';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent implements OnInit {
  url = 'http://localhost:8080/start'
  private _result: boolean = false;
  constructor(
    private httpClient: HttpClient,
    private transfer: TransferDataService,
    private router: Router) { }

  ngOnInit() {
    const checkStudent = this.checkStudent();
    if (!checkStudent) {
      this.router.navigate(['/login']);
    }

    this.httpClient.get(this.url).subscribe((res: any) => {
      this.transfer.setData(res);
      console.log(res);
    });
  }

  loadData() {

  }

  async checkStudent() {
    let url = "http://localhost:8080/checkStudent" + location.search;
    let resp = false;
    console.log("checkstudent working");
    await this.httpClient.get(url).subscribe((res: any) => {
      if (res.success) {
        console.log("writing new token");
        localStorage.setItem("studentEmail", res.email);
        localStorage.setItem("studentToken", res.token);
        this._result = true;
        return resp = true;
      }
    });
    return resp;
  }

  startExam() {
    this.loadData();
    console.log("Exam started");
    this.router.navigateByUrl("/exam");
  }

}
