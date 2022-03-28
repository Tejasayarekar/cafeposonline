import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { DbService } from '../services/db.service';


declare const form_valid:any;
declare const form_valid1:any;
declare const success_sms_disp:any;
declare const error_sms_disp:any;
declare const load_loading_img:any;
declare const remove_loading_img:any;
declare const reset_form:any;
declare const row_filter:any;
declare const date_picker:any;

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  data:any=[];
  fd:any=[];
  constructor(
    private db:DbService,
    private API:APIService,
    private router:Router
    ) { }

  ngOnInit(): void {
    form_valid('form');
  }
  login_check()
  {
    let ch=form_valid1('form');
    if(ch){
      load_loading_img('login_btn');
      let dd={modal:'login',sub_modal:'user',uid:this.fd.email,pass:this.fd.pass};
      this.API.post_api(dd).subscribe((res)=>{
        remove_loading_img('login_btn');
        if(res.result=="success")
        {
          success_sms_disp("err_status","Login Successful",5000);
          this.get_member_data();

        } else{
          error_sms_disp("err_status","Invalid EmailId & Password",8000);
        }
      },(err)=>{
        remove_loading_img('login_btn');
      });
    }

  }
  get_member_data()
  {
    let dd={modal:'user',sub_modal:'fetch_login',email:this.fd.email};
    this.API.post_api(dd).subscribe((res)=>{
      let key=this.db.get_admin_key();
      localStorage.setItem(key,JSON.stringify(res));
      this.router.navigateByUrl("home");
    })
  }
}
