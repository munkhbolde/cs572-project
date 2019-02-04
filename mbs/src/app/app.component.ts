import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  // templateUrl: './index.html',
  template: `
    <app-question></app-question>
  `,

  styleUrls: ["./style.css"]
})
export class AppComponent {
  title = "mbs";
}
