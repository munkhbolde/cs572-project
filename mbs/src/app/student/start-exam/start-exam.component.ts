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

  }

  loadData() {
    this.httpClient.get(this.url).subscribe((res: any) => {
      this.transfer.setData(res);
      console.log(res);
    });
  }

  startExam() {
    this.loadData();
    console.log("Exam started");
    this.router.navigateByUrl("/exam");
  }

}
