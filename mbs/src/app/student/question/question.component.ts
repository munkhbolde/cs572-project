import { Component, OnInit, Input, ViewChild } from "@angular/core";
import "ace-builds/webpack-resolver";
import { FormGroup, FormBuilder } from '@angular/forms';
import { edit, Editor } from 'brace';
import { AceEditorComponent } from 'ng2-ace-editor';
import { TransferDataService } from '../../services/transfer-data.service'

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

  constructor(private transfer: TransferDataService) { }
  data = this.transfer.getData();

  ngOnInit() {
    if (this.data) {
      console.log(this.data);
    } else {
      console.log("No data");
    }
    if (this.q == null) {
      this.q = this.exam[0].question;
      this.number = 1;
    }
  }

  ngAfterViewInit() { }

  onChange(code: string) {
    let ssLen = this.exam[this.number - 1].snapshot.length;
    if (ssLen > 0) {
      if (this.exam[this.number - 1].snapshot[ssLen - 1] != code) {
        this.snapshot.push(code);
        console.log(code);
      }
    } else {
      this.code = code;
      console.log(code);
    }
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
    this.exam[this.number - 1].snapshot.concat(this.snapshot);
    this.exam[this.number - 1].timeSpent = 0;// TODO insert timer value
    this.number += 1;
    this.q = this.exam[this.number - 1].question;
    this.editor.setText(this.exam[this.number - 1].answer);
    this.snapshot = this.exam[this.number - 1].snapshot;
  }

  prevQuestion() {
    //TODO: disble prev button when question 1 is showing
    this.exam[this.number - 1].answer = this.code;
    this.exam[this.number - 1].snapshot.concat(this.snapshot);
    this.exam[this.number - 1].timeSpent = 0;// TODO insert timer value
    this.number -= 1;
    this.q = this.exam[this.number - 1].question;
    this.editor.setText(this.exam[this.number - 1].answer);
    this.snapshot = this.exam[this.number - 1].snapshot;
  }
}