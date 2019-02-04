import { Component, OnInit, Input, ViewChild } from "@angular/core";
import "ace-builds/webpack-resolver";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  question: string;
  text: string;
  options: any = { maxLines: 1000, printMargin: false };
  private snapshot: string[];

  constructor() {
    this.question =
      "Q1. Write a function that remove only even elements from integer array";
  }

  ngOnInit() {}

  onChange(code) {}

  onSubmit() {
    console.log(this.snapshot);
  }
}
