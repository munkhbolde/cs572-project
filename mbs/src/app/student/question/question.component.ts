import { Component, OnInit, Input, ViewChild } from "@angular/core";
import "ace-builds/webpack-resolver";
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  private exam = {
    question: "",
    anwser: "",
    snapshot: []
  };
  options: any = { maxLines: 1000, printMargin: false };
  private snapshot: string[] = [];
  private code: string = "";

  constructor() {

  }

  ngOnInit() {

  }

  onChange(code: string) {
    console.log(code);
    this.snapshot.push(code);
    this.code = code;
  }

  submitAnswer() {
    console.log(this.snapshot);

    if (localStorage["exam"] != null) {
      //Insert data
      console.log(localStorage["exam"]);
    } else {
      //TODO: Guard here no submission
    }
  }

  nextQuestion() {
    if (localStorage.getItem("exam") === null) {
      this.exam.anwser = this.code;
      // this.exam.question = this.code // TODO : getQuestion
      this.exam.snapshot = this.snapshot;
      localStorage.setItem("exam", JSON.stringify(this.exam));
    } else {
      localStorage["exam"].concat(",", JSON.stringify(this.exam));
    }

    this.exam.anwser = null;
    this.exam.question = null;
    this.exam.snapshot = null;
    this.code = "";
    this.snapshot = [];
  }
}
