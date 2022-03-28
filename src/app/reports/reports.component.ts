import { Component, OnInit } from '@angular/core';
import { UserValidService } from '../services/user-valid.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(private valid:UserValidService)
  {
    this.valid.get_validation_status("purchase");
   }

  ngOnInit(): void {
  }

}
