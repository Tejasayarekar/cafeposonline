import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { SmsService } from '../services/sms.service';
import { UrlService } from '../services/url.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ExcelDataService } from '../services/excel-data.service';
import { DbService } from '../services/db.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { SqlService } from '../services/sql.service';
import { UserValidService } from '../services/user-valid.service';
import { APIService } from '../services/api.service';

declare const form_valid:any;
declare const form_valid1:any;
declare const success_sms_disp:any;
declare const error_sms_disp:any;
declare const load_loading_img:any;
declare const remove_loading_img:any;
declare const reset_form:any;
declare const row_filter:any;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}),

};

@Component({
  selector: 'app-all-admin',
  templateUrl: './all-admin.component.html',
  styleUrls: ['./all-admin.component.scss']
})
export class AllAdminComponent implements OnInit {

  fd:any=[];
  data:any=[];
  row_list:any=[];
  p: number = 1;

  constructor(
    private api:APIService,
    private sql:SqlService,
    private imageCompress:NgxImageCompressService,
    private HTTP:HttpClient,
    private router:Router,
    private sms:SmsService,
    private url:UrlService,
    private excel:ExcelDataService,
    private ref:ChangeDetectorRef,
    private db:DbService,
    private valid:UserValidService) {
      this.valid.get_validation_status("admin");
      this.data.del_btn=false;
      this.data.update_btn=false;
      this.data.add_btn=true;

      this.fd.add=false;
      this.fd.edit=false;
      this.fd.delete=false;

      this.fd.temp_acc_list=[];

      this.data.type_list=[{id:'admin',name:"ADMIN"},{id:'user',name:"USER"}];
      this.data.access_list=[
        {id:"all",name:"all"},
        {id:"dashboard",name:"dashboard"},
        {id:"category",name:"category"},
        {id:"product",name:"product"},
        {id:"admin",name:"admin"},
        {id:"setting",name:"setting"},
        {id:"inventory",name:"inventory"},
        {id:"table",name:"table"},
        {id:"sales",name:"sales"},
        {id:"purchase",name:"purchase"},
        {id:"reports",name:"reports"},

      ];

      this.fd.type=0;
      this.fd.access=0;

      this.data.tb_list=this.db.get_table_names();
      this.data.tb_name=this.data.tb_list[0].all_users_tb;


      this.load_data_list();
      this.reset();
     }

  ngOnInit(): void {

        row_filter("table_rc","search");
  }

  operation_access()
  {
    let nm=this.fd.access;
    console.log(this.fd.temp_acc_list);
    let cnt=0;

    for(let i=0;i<this.fd.temp_acc_list.length;i++)
    {

      if(nm==this.fd.temp_acc_list[i].name)
      {
        cnt=cnt+1;
        break;
      }
      else
      {

      }
    }

    if(cnt==0)
    {

        this.fd.temp_acc_list.push({name:nm});
    }


  }
  operation_cancel(index:any){
    this.fd.temp_acc_list.splice(index,1);
  }


  save()
  {
    let val_list=[];
    val_list.push(this.fd.uname,this.fd.email,this.fd.pass,this.fd.type,this.fd.add,this.fd.edit,this.fd.delete);
    let dd={modal:'admin',sub_modal:'add',val_list:val_list};
    this.api.post_api(dd).subscribe((res)=>{
      if(res.result=="success")
      {
        success_sms_disp("err_status","Record added successful",5000);
        this.load_data_list();
        this.reset();        
      }
      else{
        error_sms_disp("err_status","Something went wrong",8000);
      }
    })   

  }
  update()
  {
    if(this.data.id_edit==undefined || this.data.id_edit==0)
      {
        this.sms.print_error("Please Select Record To Update");
      }else
      {
        let ch=form_valid1("form");
            if(ch)
            {
              let time=this.db.get_date_time();
              let val_list=[];
              val_list.push(this.fd.uname,this.fd.email,this.fd.pass,this.fd.type,this.fd.add,this.fd.edit,this.fd.delete);
              var dd={modal:'admin',sub_modal:'update',aid:this.data.id_edit,val_list:val_list};
              this.api.post_api(dd).subscribe((res)=>{
                if(res.result=="success")
                {
                  success_sms_disp("err_status","Record Updated successful",8000);
                  this.load_data_list();
                  this.reset();

                }
                else{
                  error_sms_disp("err_status","Something went wrong",8000);
                }
              })
              };
            }
      }

  reset(){
    reset_form("form");
    this.data.id_edit=0;
    this.data.del_btn=false;
    this.data.update_btn=false;
    this.data.add_btn=true;
    this.fd.temp_acc_list=[];


  }


 load_data_list()
  {
    let dd={modal:'admin',sub_modal:'fetch_all'};
    this.api.post_api(dd).subscribe((res)=>{
      this.data.data_list=res;
    });
  }


edit(id:any)
{
  this.data.id_edit=id;
  this.data.del_btn=true;
  this.data.update_btn=true;
  this.data.add_btn=false;
  for(let i=0;i<this.data.data_list.length;i++)
  {
    if(this.data.data_list[i].aid==id)
    {

    this.fd.uname=this.data.data_list[i].uname;
    this.fd.email=this.data.data_list[i].email;
    this.fd.b_pass=this.data.data_list[i].pass;
    this.fd.pass=this.data.data_list[i].pass;
    this.fd.type=this.data.data_list[i].type;
    this.fd.add=this.data.data_list[i].acc_add;
    this.fd.edit=this.data.data_list[i].acc_edit;
    this.fd.delete=this.data.data_list[i].acc_delete;
    this.fd.temp_acc_list=[];
    this.fd.temp_acc_list=JSON.parse(this.data.data_list[i].acc_menu);
      break;
    }
  }
}

delete()
{
  let id=this.data.id_edit;
  for(let i=0;i<this.data.data_list.length;i++){
    if(this.data.data_list[i].aid==id){

      let name=this.data.data_list[i].uname;
    this.sms.print_confirm("Are Your Sure Want to Delete : "+name+" ? ")
    .then((result:any)=>{
              if(result.isConfirmed)
              {
                var dd={modal:'admin',sub_modal:'delete',aid:this.data.id_edit};

                    this.api.post_api(dd).subscribe((res)=>{
                      if(res.result=="success")
                      {
                        success_sms_disp("err_status","Record Deleted successful",5000);
                        this.data.data_list.splice(i,1);
                        this.reset();
      
                      }
                      else{
                        error_sms_disp("err_status","Something went wrong",8000);
                      }
                    })
                };
              }
    )
      break;

    }
}
  }
}

