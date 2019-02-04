import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./routing";
import { AppComponent } from "./app.component";
import { QuestionComponent } from "./student/question/question.component";
import { AceEditorModule } from "ng2-ace-editor";

@NgModule({
  declarations: [AppComponent, QuestionComponent],
  imports: [BrowserModule, AppRoutingModule, AceEditorModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
