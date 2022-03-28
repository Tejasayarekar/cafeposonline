import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  data:any=[];
  constructor(private db:DbService)
  {
    this.data.year=this.db.get_date_year();
   }

  ngOnInit(): void {
  }

}
