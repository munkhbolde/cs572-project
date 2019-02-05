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
    question: "1. What is an array",
    anwser: "",
    timeSpent: 0,
    snapshot: []
  }, {
    question: "2. Create a function that delete the last element of array",
    anwser: "",
    timeSpent: 0,
    snapshot: []
  }, {
    question: "3. What's my name",
    anwser: "",
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

  }

  prevQuestion() {

  }
}
