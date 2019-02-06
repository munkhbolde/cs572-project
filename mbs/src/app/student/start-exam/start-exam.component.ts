import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent implements OnInit {
  url = 'http://localhost:8080/start'

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.httpClient.get(this.url).subscribe((res: any) => {
      console.log(res);
    });
  }

  startExam() {
    console.log("Exam started");
  }

}
