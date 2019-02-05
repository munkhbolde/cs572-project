import { Component, OnInit, Input, ViewChild } from "@angular/core";
import "ace-builds/webpack-resolver";
import { FormGroup, FormBuilder } from '@angular/forms';
import { edit, Editor } from 'brace';
import { AceEditorComponent } from 'ng2-ace-editor';
@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  @ViewChild('editor') editor;
  @Input() q;
  @Input() number;

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

  private snapshot: string[] = [];
  private code: string = "";

  constructor() { }

  ngOnInit() {
    console.log(this.editor);
    if (this.q == null) {
      this.q = this.exam[0].question;
      this.number = 1;
    }
  }

  ngAfterViewInit() { }

  onChange(code: string, id) {
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
    //TODO: disble next button when question 3 is showing
    this.exam[this.number - 1].answer = this.code;
    this.exam[this.number - 1].snapshot = this.snapshot;
    this.code = "";
    this.snapshot = [];
    this.q = this.exam[this.number].question;
    this.editor.setText(this.exam[this.number].answer);
    this.number = this.number + 1;
  }

  prevQuestion() {
    //TODO: disble prev button when question 1 is showing
    this.exam[this.number - 1].answer = this.code;
    this.exam[this.number - 1].snapshot = this.snapshot;
    this.code = "";
    this.snapshot = [];
    this.q = this.exam[this.number - 1].question;
    this.editor.setText(this.exam[this.number - 1].answer);
    this.number--;
  }
}