import { Component, OnInit, Input, ViewChild } from "@angular/core";
import "ace-builds/webpack-resolver";
import { FormGroup, FormBuilder } from '@angular/forms';
import { edit, Editor } from 'brace';
import { AceEditorComponent } from 'ng2-ace-editor';
import { TransferDataService } from '../../services/transfer-data.service'
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  @ViewChild("editor") editor;
  @Input() q;
  @Input() number;

  private snapshot: string[] = [];
  private code: string = "";
  private studentEmail: string = "bilgee.py@gmail.com";
  private exam = [{
    question: "What is an array",
    answer: "",
    timeSpent: 0,
    snapshot: []
  }, {
    question: "Create a function that delete the last element of array",
    answer: "",
    timeSpent: 0,
    snapshot: []
  }, {
    question: "What's my name",
    answer: "",
    timeSpent: 0,
    snapshot: []
  }];
  data = this.transfer.getData();

  //angular functions
  constructor(private transfer: TransferDataService,
    private studentService: StudentService,
    private router: Router) { }

  ngOnInit() {
    if (this.data) {
      console.log(this.data);
    } else {
      console.log("No data", this.data);
    }
    if (this.q == null) {
      this.q = this.exam[0].question;
      this.number = 1;
    }
  }

  ngAfterViewInit() { }

  onChange(code: string) {
    this.code = code;
    this.snapshot.push(code);
    console.log(this.snapshot);
  }

  submitAnswer() {
    console.log(this.exam);
    this.studentService.submitAnswer(this.exam, this.studentEmail).subscribe((res) => {
      if (res.success) {
        this.router.navigate(['/login']);
      }
    }, err => {
      console.log(err);
    });
  }

  updateObject(number, answer, snapshot) {
    this.exam[number].answer = answer;
    this.exam[number].snapshot = snapshot;
  }

  nextQuestion() {
    let objNumber = this.number - 1;
    this.updateObject(objNumber, this.code, this.snapshot);
    this.code = "";
    objNumber += 1;
    this.q = this.exam[objNumber].question;
    this.editor.setText(this.exam[objNumber].answer);
    this.snapshot = this.exam[objNumber].snapshot;
    this.number++;
    // //TODO: disble next button when question 3 is showing
  }

  prevQuestion() {
    let objNumber = this.number - 1;
    this.updateObject(objNumber, this.code, this.snapshot);
    objNumber -= 1;
    this.code = "";
    this.q = this.exam[objNumber].question;
    this.editor.setText(this.exam[objNumber].answer);
    this.snapshot = this.exam[objNumber].snapshot;
    this.number--;

    // //TODO: disble prev button when question 1 is showing
  }
}