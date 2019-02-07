import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferDataService } from '../../services/transfer-data.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent implements OnInit {
  url = 'http://localhost:8080/start'

  constructor(
    private httpClient: HttpClient,
    private transfer: TransferDataService,
    private router: Router) { }

  ngOnInit() {
    const checkStudent = this.checkStudent();
    console.log("check student ", checkStudent);
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
    console.log("check student is working");
    let url = "http://localhost:8080/checkStudent" + location.search;
    let resp = false;
    await this.httpClient.get(url).subscribe((res: any) => {
      console.log("success:", res.success);
      if (res.success) {
        console.log(res.success);
        return resp = true;
      }
    });
    console.log(resp);
    return resp;
  }

  startExam() {
    this.loadData();
    console.log("Exam started");
    this.router.navigateByUrl("/exam");
  }

}
