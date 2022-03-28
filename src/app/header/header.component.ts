import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { SqlService } from '../services/sql.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  data:any=[];
  constructor(
    private sql:SqlService,
    private db:DbService)
  {

    this.data.img_path="assets/img/icons/app_logo.png";
    this.data.tb_list=this.db.get_table_names();
    this.data.tb_name=this.data.tb_list[0].setting_tb;
    this.load_data_list(this.data.tb_name);
   }

  ngOnInit(): void {
  }
  load_data_list(tb_name:any)
  {
    this.sql.fetch_all(tb_name).subscribe((result:any) => {

      this.data.dekstop_head=result[0].cafe_name;
      this.data.mobile_head=result[0].cafe_name;
      //result[0].tag_line;
    });
}
}
