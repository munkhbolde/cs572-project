import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  private data: any[];
  constructor(private router: Router, ) { }

  setData(data) {
    this.data = data;
  }

  getData() {
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData() {
    this.data = undefined;
  }
}
