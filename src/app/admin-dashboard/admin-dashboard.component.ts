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
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

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
    private valid:UserValidService)
    {
      this.valid.get_validation_status("dashboard");
      this.load_all_count();
    }
    ngOnInit(): void {

    }

    load_all_count()
    {
      this.data.tb_list=this.db.get_table_names();
      this.data.tb_name_product=this.data.tb_list[0].product_tb;
       this.data.tb_name_category=this.data.tb_list[0].category_tb;
        this.data.all_sales_tb=this.data.tb_list[0].all_sales_tb;
        this.data.all_purchase_tb=this.data.tb_list[0].all_purchase_tb;

      this.sql.getCount(this.data.tb_name_product).subscribe((tb_count)=>{
        this.data.product_cnt=tb_count;
      });
      this.sql.getCount(this.data.tb_name_category).subscribe((tb_count)=>{
        this.data.category_cnt=tb_count;
      });

      this.data.sales_cnt=0;
      this.sql.fetch_all(this.data.all_sales_tb).subscribe((result:any)=>{

        for(let i=0;i<result.length;i++)
        {
         this.data.sales_cnt= this.data.sales_cnt+result[i].amount;
        }
      });
      this.data.purchase_cnt=0;
      this.sql.fetch_all(this.data.all_purchase_tb).subscribe((result:any)=>{
        for(let i=0;i<result.length;i++)
        {
         this.data.purchase_cnt= this.data.purchase_cnt+result[i].amount;
        }
      });
    }
  }
