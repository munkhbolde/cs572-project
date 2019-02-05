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
  //= [{ "id": 1, "name": "selina", "exam": "took", "result": "result", "email": "selina@gmail.com" },
  //{ "id": 1, "name": "selina", "exam": "took", "result": "result", "email": "selina@gmail.com" }];

  constructor(private stafservice: StaffserviceService) {
    stafservice.getstudentinfo().subscribe(
      (data) => {
        console.log(data); this.studentinfo = data;
      },
      (err) => {
        return console.log(err);
      }
    )

  }
  ngOnInit() {
  }
  sendinvitation(email) {
    console.log(email)
    this.stafservice.sendinvitation(email)
      .subscribe((d) => console.log(d)
        , (err) => console.log(err))
  }
  sendemail(email) {
    this.stafservice.sendemail(email)
      .subscribe((d) => console.log(d)
        , (err) => console.log(err))
  }


}
