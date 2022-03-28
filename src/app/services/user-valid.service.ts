import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { SmsService } from './sms.service';
import { SqlService } from './sql.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserValidService {

  data:any=[]
  constructor(
    private db:DbService,
    private sql:SqlService,
    private sms:SmsService,
    private router:Router
  )
   { }

   get_validation_status(page:any){
  let key=this.db.get_admin_key();
  var access_data:any=localStorage.getItem(key);
    let access_menu=JSON.parse(access_data);
    this.data.user_type=access_data[0].type;
    this.data.menu_list=JSON.parse(access_menu[0].acc_menu);
    let ch=this.check_available(page);
  if(ch){

  }else{
    this.sms.print_error("Invalid Access Found");
    this.router.navigateByUrl("login");
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
