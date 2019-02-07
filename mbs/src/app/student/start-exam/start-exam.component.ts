import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferDataService } from '../../services/transfer-data.service';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent implements OnInit {
  url = 'http://localhost:8080/start'
  private _result: boolean = false;
  constructor(
    private studentService: StudentService,
    private router: Router) {
  }

  ngOnInit() {
    const checkStudent = this.checkStudentExist();
    if (!checkStudent) {
      this.router.navigate(['/login']);
    }

  }

  async checkStudentExist() {
    let _result: boolean = false;
    await this.studentService.checkStudent(location.search).subscribe((res) => {
      if (res.success) {
        _result = true;
        localStorage.setItem("studentToken", res.token);
        localStorage.setItem("studentEmail", res.email);
      } else {
        console.log("error on check student", res);
      }
    });
    return _result;
  }

  async fetchQuestions() {
    await this.studentService.fetchQuestions().subscribe((res) => {
      if (res.success) {
        console.log("45:", res.data);
        localStorage.setItem("examQuestions", JSON.stringify(res.data));
      }
    });
  }

  startExam() {
    console.log("Exam started");
    this.checkStudentExist();
    this.fetchQuestions();
    this.router.navigateByUrl("/exam");
  }

}
