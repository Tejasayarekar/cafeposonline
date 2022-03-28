import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { SqlService } from '../services/sql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data:any=[];
  constructor(private db:DbService,private sql:SqlService,
    private router:Router)
  {
    this.data.tb_list=this.db.get_table_names();
      this.data.tb_name=this.data.tb_list[0].all_users_tb;
    this.check_login();

   }

  ngOnInit(): void {
  }

  check_login()
  {
    /*
    let email=this.data.email;
    let pass=this.data.pass;*/
    let email="suraj.pawar13496@gmail.com";
    let pass="Demouser@1";

    this.sql.fetch_all(this.data.tb_name).subscribe((result:any) => {
        console.log("Result List",result);
        for(let i=0;i<result.length;i++){
          if(result[i].email==email && result[i].pass==pass)
          {
            let key=this.db.get_login_key();
            localStorage.setItem(key,JSON.stringify(result));
            this.router.navigateByUrl("home");
            break;
          }
         }

      });


  }

}
