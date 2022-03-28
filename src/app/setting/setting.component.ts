  import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
  import { HttpClient , HttpHeaders} from '@angular/common/http';
  import { Router } from '@angular/router';
  import { SmsService } from '../services/sms.service';
  import { UrlService } from '../services/url.service';
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
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
  })
  export class SettingComponent implements OnInit {
    fd:any=[];
    data:any=[];
    row_list:any=[];
    p: number = 1;

    constructor(
      private imageCompress:NgxImageCompressService,
      private HTTP:HttpClient,
      private router:Router,
      private sms:SmsService,
      private url:UrlService,
      private excel:ExcelDataService,
      private ref:ChangeDetectorRef,
      private db:DbService,
      private valid:UserValidService,
      private api:APIService) {

        this.valid.get_validation_status("setting");
        this.data.del_btn=false;
        this.data.update_btn=false;
        this.data.add_btn=true;
        this.fd.cat=0;

        this.fd.purchase_in=false;
        this.fd.sales_in=false;


        this.load_data_list();
        this.reset();
       }

    ngOnInit(): void {
      form_valid("form");

    }
    convert_to_mb(size_bt:any){
      let fix_val=1048576;
      let mb=size_bt/fix_val;
      return mb;
    }
    compressFile(image:any,orientation:any) {

      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.fd.img_data=result;
        }
      );

  }
  change_logo(event:any)
  {
    let site_url=this.url.get_modal_url();
    this.data.img_path="../../assets/img/gif/loading_new.gif";
    let fd = new FormData();
    fd.append("file", event.target.files[0]);
    fd.append("modal", "setting");
    fd.append("sub_modal", "logo");

    let dd=fd;
    this.HTTP.post<any>(site_url,dd).subscribe((res:any)=>{

      if(res.result=="success"){

        this.data.img_path=this.url.get_img_url()+"logo.png";

        success_sms_disp("err_status","Record Updated Succesfull",5000);
      }else{
        error_sms_disp("err_status",res.result);
      }

    },(err)=>{
      console.log("Error "+err.message+"\n"+err.error);

    });
  }

    update()
    {

          let ch=form_valid1("form");
              if(ch)
              {
                load_loading_img("update_btn");
                let time=this.db.get_date_time();
                let val_list=[];
                val_list.push(

                  this.fd.name,
                  this.fd.address,
                  this.fd.tag,
                  this.fd.bill_prefix,
                  this.fd.purchase_in,
                  this.fd.sales_in
                  );
                 let dd_up={
                  modal:'setting',
                  sub_modal:"update",
                  val_list:val_list
                  };
                  this.api.post_api(dd_up).subscribe((res)=>{
                    remove_loading_img("update_btn");
                    if(res.result=="success")
                    {
                      success_sms_disp("err_status","Record Updated Successfully",8000);
                    }else{
                      error_sms_disp("err_status","Something Went Wrong",8000);
                    }
                  },(error)=>{
                    remove_loading_img("update_btn");
                  });

        }
    }
    reset(){
      reset_form("form");
      this.data.add_btn=true;
      this.data.default_src='../../assets/img/profile.png';
    }

     load_data_list()
    {
      let dd={modal:"setting",sub_modal:"fetch"};
      this.api.post_api(dd).subscribe((result:any) => {

        this.fd.name=result[0].cafe_name;
        this.fd.address=result[0].cafe_address;
        this.fd.tag=result[0].tag_line;
        this.fd.bill_prefix=result[0].bill_prefix;
        this.fd.purchase_in=result[0].purchase_in;
        this.fd.sales_in=result[0].sales_in;


      });

    }






  }
