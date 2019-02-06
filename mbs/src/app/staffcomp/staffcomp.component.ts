import { Component, OnInit } from '@angular/core';
import { StaffserviceService } from '../staffservice.service';
import { promise } from 'protractor';
import { observable, Observable } from 'rxjs';

@Component({
  selector: 'app-staffcomp',
  templateUrl: './staffcomp.component.html',
  styleUrls: ['./staffcomp.component.css']
})
export class StaffcompComponent implements OnInit {
  studentinfo = []
  staffresponse;
  constructor(private stafservice: StaffserviceService) {
    this.stafservice.getstudentinfo().subscribe(
      (data) => {
        data.forEach(element => {
          this.studentinfo = element;
        });
      },
      (err) => {

      }
    )
  }
  ngOnInit() {

  }
  sendinvitation(email) {

    this.stafservice.sendinvitation(email)
      .subscribe((d) => this.staffresponse = d
        , (err) => console.log(err))
  }
  sendemail(email, state) {
    console.log(email + state)
    if (state === "pass" || state === "fail") {
      this.stafservice.sendemail(email, state)
        .subscribe((d) => this.staffresponse = d
          , (err) => console.log(err))
    }
    else {
      console.log('result didnot come can not send email')
    }
  }

}
