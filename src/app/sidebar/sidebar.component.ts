import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';
import { SmsService } from '../services/sms.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  data:any=[];
  constructor(
    private router:Router,
    private sms:SmsService,
    private db:DbService)
  {
    this.load_access();
   }




  ngOnInit(): void {
  }
  logout()
  {
    this.router.navigateByUrl("login");
  }
  load_access(){

    var access_data:any=localStorage.getItem(this.db.get_admin_key());
     let access_menu=JSON.parse(access_data);
    if(access_data==null || access_data==undefined)
    {

      this.sms.print_error("Invalid Access Found");
      this.router.navigateByUrl("login");
    }else{
      this.data.user_type=access_menu[0].type;
      this.data.menu_list=JSON.parse(access_menu[0].acc_menu);
    }
  }

  check_available(page_name:any){

      if(this.data.menu_list.some((res:any)=>res.name==page_name) || this.data.menu_list.some((res:any)=>res.name=='all'))
        {
          return true;
        }else{
          return false;
        }
      }
  }
