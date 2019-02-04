import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  snapShot: string[];

  constructor() {}

  snapShotCollector(text) {
    this.snapShot.push(text);
    return this.snapShot;
  }
}
