

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
  selector: 'app-all-table',
  templateUrl: './all-table.component.html',
  styleUrls: ['./all-table.component.scss']
})
export class AllTableComponent implements OnInit {


  fd:any=[];
  data:any=[];
  row_list:any=[];
  p: number = 1;

  constructor(
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
      this.valid.get_validation_status("table");
      this.data.del_btn=false;
      this.data.update_btn=false;
      this.data.add_btn=true;

      this.fd.add=false;
      this.fd.edit=false;
      this.fd.delete=false;


      this.fd.type=0;
      this.fd.access=0;

      this.data.tb_list=this.db.get_table_names();
      this.data.tb_name=this.data.tb_list[0].all_table_tb;


      this.load_data_list();
      this.reset();
     }

  ngOnInit(): void {
    form_valid("form");


  }



  save()
  {
    let ch=form_valid1("form");
    if(ch){
    let time=this.db.get_date_time();
    let dd={
      tname:this.fd.tname,
      capacity:this.fd.capacity,
      save_date_tb:time

     };

    this.sql.add(this.data.tb_name,dd);
    this.load_data_list();
    this.reset();
    }
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

              let dd_up={
                tid:this.data.id_edit,
                tname:this.fd.tname,
                capacity:this.fd.capacity,
                save_date_tb:time

               };

              this.sql.update(this.data.tb_name,dd_up).subscribe((res)=>{
                this.data.data_list=res;
                this.reset();
              });
            }
      }
  }
  reset(){
    reset_form("form");
    this.data.id_edit=0;
    this.data.del_btn=false;
    this.data.update_btn=false;
    this.data.add_btn=true;


  }


  load_data_list()
  {
    this.sql.fetch_all(this.data.tb_name).subscribe((result) => {

      this.data.data_list=result;
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
       if(this.data.data_list[i].tid==id)
       {

        this.fd.tname=this.data.data_list[i].tname;
        this.fd.capacity=this.data.data_list[i].capacity;

         break;
       }
     }
    }

    delete()
    {
      let id=this.data.id_edit;
      for(let i=0;i<this.data.data_list.length;i++){
        if(this.data.data_list[i].tid==id){

         let name=this.data.data_list[i].tname;
        this.sms.print_confirm("Are Your Sure Want to Delete : "+name+" ? ")
        .then((result:any)=>{
                  if(result.isConfirmed)
                  {

                    this.sql.delete(this.data.tb_name,id).subscribe((res)=>{
                      console.log("after delete "+res );
                      this.data.data_list.splice(i,1);
                      this.reset();
                    });
                    //this.data.data_list.splice(id,1);
                  }else{

                  }
           })

         break;

        }
    }


  }




}


