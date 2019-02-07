import { Component, OnInit } from '@angular/core';
import { StaffserviceService } from '../staffservice.service';
import { promise } from 'protractor';
import { observable, Observable } from 'rxjs';
import { Router } from '@angular/router'

@Component({
  selector: 'app-staffcomp',
  templateUrl: './staffcomp.component.html',
  styleUrls: ['./staffcomp.component.css']
})
export class StaffcompComponent implements OnInit {
  studentinfo = []
  staffresponse;
  constructor(private stafservice: StaffserviceService, private router: Router) {
    this.loaddata()
  }
  ngOnInit() {

  }
  loaddata() {
    this.stafservice.getstudentinfo().subscribe(
      (data) => {
        data.forEach(element => {
          this.studentinfo = element;
          console.log(this.studentinfo)
        });
      },
      (err) => {

      }
    )
  }
  sendinvitation(email, state) {
    console.log(state)
    if (state === "") {
      console.log(state)
      this.stafservice.sendinvitation(email)
        .subscribe((d) => {
          console.log(d)
          this.staffresponse = "invitation sent"
          this.studentinfo = d.pass

        }
          , (err) => console.log(err))
    }
    else {
      this.staffresponse = "message has already been sent before"
    }
  }
  sendemail(email, state) {
    if (state === "pass" || state === "fail") {
      this.stafservice.sendemail(email, state)
        .subscribe((d) => this.staffresponse = "result sent to student"
          , (err) => console.log(err))
    }
    else {
      this.staffresponse = 'result didnot come can not send email'
    }
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
