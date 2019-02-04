import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  text: string;
  options: any = { maxLines: 1000, printMargin: false };

  constructor() {}

  ngOnInit() {}

  onChange(code) {
    console.log(`new code`, code);
  }
}
