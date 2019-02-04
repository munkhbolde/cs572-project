import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";

import "ace-builds/webpack-resolver";
@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  @ViewChild("editor") editor;
  number: number;
  question: string;
  text: string;

  options: any = { maxLines: 1000, printMargin: false };
  private snapshot: string[] = [];

  constructor(private auth: AuthService) {
    this.question =
      "1. Write a function that remove only even elements from integer array";
  }

  ngOnInit() {
    this.auth.login();
  }

  onChange(code: string) {
    this.snapshot.push(code);
  }

  submitAnswer() {
    console.log(this.snapshot);
  }
}
