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
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit {

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

      this.valid.get_validation_status("product");
      this.data.del_btn=false;
      this.data.update_btn=false;
      this.data.add_btn=true;
      this.fd.cat=0;


      this.data.tb_list=this.db.get_table_names();
      this.data.tb_name=this.data.tb_list[0].product_tb;
      this.data.tb_name_category=this.data.tb_list[0].category_tb;


      this.load_category_list();
      this.load_data_list();
      this.reset();
     }

  ngOnInit(): void {
        form_valid("form");

        row_filter("table_rc","search");
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
  upload_images(event:any)
  {

    this.data.docs = <File>event.target.files;
    console.log(" Image Details"+JSON.stringify(event.target.files));
    for(let i=0;i<this.data.docs.length;i++)
    {

      let img_size_byte=this.data.docs[0].size;
      this.data.img_name=this.data.docs[0].name;  // to get file size in byte
      let img_size_mb=this.convert_to_mb(img_size_byte);  // to get file size in mb

      // to show preview of images selcted
    var reader = new FileReader();
    reader.onload = (event: any) => {
      if(img_size_mb > 1)
      {
        this.compressFile(event.target.result,1); // to reduce file size
      }else{
            this.fd.img_data=event.target.result;
      }
    }
      reader.readAsDataURL(event.target.files[i])
    }
  }
  save()
  {
    /*let img_dd={img_name:this.data.img_name,img_for:"category",img_data:this.fd.img_data};
    this.sql.add("images",img_dd);
*/
let ch=form_valid1("form");
if(ch)
{
    let time=this.db.get_date_time();
    let dd={
            cid:this.fd.cat,
            pname:this.fd.pname,
            p_img:this.fd.img_data,
            sell_price:this.fd.sell_prc,
            buy_price:this.fd.buy_prc,
            qty:this.fd.qty,
            item_code:this.fd.code,
            save_date_product:time};
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
                pid:this.data.id_edit,
                cid:this.fd.cat,
                pname:this.fd.pname,
                p_img:this.fd.img_data,
                sell_price:this.fd.sell_prc,
                buy_price:this.fd.buy_prc,
                qty:this.fd.qty,
                item_code:this.fd.code,
                save_date_product:time};

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

    this.data.default_src='../../assets/img/profile.png';
  }

  load_category_list()
  {
    this.sql.fetch_all(this.data.tb_name_category).subscribe((result) => {
      this.data.cat_list=result;
    });
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
       if(this.data.data_list[i].pid==id)
       {
        this.data.default_src=this.data.data_list[i].p_img;
        this.fd.img_data=this.data.data_list[i].p_img;
        this.fd.cat=this.data.data_list[i].cid;
        this.fd.pname=this.data.data_list[i].pname;
        this.fd.sell_prc=this.data.data_list[i].sell_price;
        this.fd.buy_prc=this.data.data_list[i].buy_price;
        this.fd.qty=this.data.data_list[i].qty;
        this.fd.code=this.data.data_list[i].item_code;
         break;
       }
     }
    }

    delete()
    {
      let id=this.data.id_edit;
      for(let i=0;i<this.data.data_list.length;i++){
        if(this.data.data_list[i].pid==id){

         let name=this.data.data_list[i].pname;
        this.sms.print_confirm("Are Your Sure Want to Delete : "+name+" ? ")
        .then((result:any)=>{
                  if(result.isConfirmed)
                  {

                    this.sql.delete(this.data.tb_name,id).subscribe((res)=>{
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
