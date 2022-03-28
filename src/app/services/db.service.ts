import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  admin_key="admin_data233";
  table_names:any=[
    {
      category_tb:"category",
      product_tb:"product",
      table_tb:"table",
      all_users_tb:"all_users",
      all_sales_tb:"all_sales",
      all_purchase_tb:"all_purchase",
      setting_tb:"setting",
      all_table_tb:"table"
    }
    ];
    login_storage_key="login_details";

  myDate:any;
  constructor(
    private datePipe: DatePipe
  ) { }


  get_admin_key()
  { 
     return this.admin_key;
  }

get_table_names(){
 return this.table_names;
}

get_login_key(){
  return this.login_storage_key;
}

  get_date(){
  this.myDate=new Date();
  this.myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
  return this.myDate;
  }

  get_date_time(){
    this.myDate=new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy, h:mm a');
    return this.myDate;
  }

  get_date_year(){
    this.myDate=new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy');
    return this.myDate;
  }


}
