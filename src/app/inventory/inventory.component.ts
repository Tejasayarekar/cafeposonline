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

};@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
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
    private valid:UserValidService)
    {
      this.valid.get_validation_status("inventory");
      this.data.tb_list=this.db.get_table_names();
      this.data.tb_name=this.data.tb_list[0].product_tb;
      this.data.tb_name_category=this.data.tb_list[0].category_tb;

      this.load_product();
    }

  ngOnInit(): void {
  }

  load_product()
  {
    this.data.low_stock=[];
       this.data.out_stock=[];
 
       let dd={modal:'category',sub_modal:'add',};
       this.api.post_api(dd).subscribe((res)=>{
         if(res.result=="success")
         {
           success_sms_disp("err_status","Record added successful",8000);
            // for(let i=0;i<result.length;i++)
            // {
            //   if(result[i].qty<0){
            //     this.data.out_stock.push(result[i]);
            //   }else if(result[i].qty>0 && result[i].qty<50){
            //     this.data.low_stock.push(result[i]);
            //   }
            // }
      }
      else{
        error_sms_disp("err_status","Something went wrong",8000);
      }
    })
  };
}