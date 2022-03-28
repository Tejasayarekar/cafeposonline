

  import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { SmsService } from '../services/sms.service';
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
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  data:any=[];

  keyword_table="tname";
  keyword_product="pname";
  keyword_category="cname";

  table_list:any=[];
  product_list:any=[];
  temp_product_list:any=[];
  category_list:any=[];
  temp_data_list:any=[];

  constructor(
    private valid:UserValidService,
    private sql:SqlService,
    private db:DbService,
    private sms:SmsService
  )
  {
this.valid.get_validation_status("purchase");

  this.data.pop_up=true;


    this.data.cash=true;
    this.data.online=false;
    this.data.split=false;

    this.data.paid=false;
    this.data.pending=true;

    this.data.payment_mode="CASH";
    this.data.payment_sts="PENDING";

    this.data.tot=0;
    this.data.discount=0;
    this.data.tb_list=this.db.get_table_names();
    this.data.tb_name_product=this.data.tb_list[0].product_tb;
    this.data.tb_name_category=this.data.tb_list[0].category_tb;
    this.data.tb_name_table=this.data.tb_list[0].all_table_tb;
    this.data.tb_name_setting=this.data.tb_list[0].setting_tb;
    this.data.tb_name_purchase=this.data.tb_list[0].all_purchase_tb;

    this.data.qty=[];
    this.load_setting();
    this.load_category_list();
    this.load_product_list();
    this.load_table_list();
    this.load_purchase_data_list();

   }

  ngOnInit(): void {
  }

  open_pop()
  {
    this.data.typ="add";
    this.data.pop_up=false;

    this.data.add_btn=false;
    this.data.reset_btn=false;
    this.data.close_btn=false;

    this.data.update_btn=true;
    this.data.reload_btn=true;


    form_valid("form");
    reset_form("form");
  }
  status_change(val:any)
  {
    if(val=="pending" || val=="PENDING"){

      this.data.pending=true;
      this.data.paid=false;
      this.data.payment_sts="PENDING";

    }else{
      this.data.pending=false;
      this.data.paid=true;
      this.data.payment_sts="PAID";


    }
  }
  mode_change(val:any)
  {


    if(val=="cash" || (val=="CASH"))
    {
      this.data.cash=true;
      this.data.online=false;
      this.data.split=false;
      this.data.cash_received=this.data.tot-this.data.discount;
      this.data.online_received=0;
      this.data.payment_mode="CASH";


    }else if(val=="online" || val=="ONLINE")
    {
      this.data.cash=false;
      this.data.online=true;
      this.data.split=false;
      this.data.cash_received=0;
      this.data.online_received=this.data.tot-this.data.discount;
      this.data.payment_mode="ONLINE";

    }else{
      this.data.cash=false;
      this.data.online=false;
      this.data.split=true;

      let final_amt=this.data.tot-this.data.discount;
      let ch=final_amt/2;
      ch=Math.round(ch);
      let on=final_amt-ch;
      this.data.cash_received=ch;
      this.data.online_received=on;
      this.data.payment_mode="SPLIT";
    }

  }


  selectProduct(event:any)
  {
    let cnt=0;
      let pid=event.pid;
      let pname=event.pname;
      let sell_price=event.sell_price;
      let buy_price=event.buy_price;
      let qty=1;
      let dd={
        'pid':pid,
        'pname':pname,
        'sell_price':sell_price,
        'buy_price':buy_price,
        'qty':qty
      };

      for(let i=0;i<this.temp_data_list.length;i++)
      {

          if(pid==this.temp_data_list[i].pid){
            let prv_qty=this.temp_data_list[i].qty;
            this.temp_data_list[i].qty=prv_qty+1;
            this.data.qty[i]=prv_qty+1;
            cnt++;
            break;
          }else{

          }
      }
      if(cnt==0){
        this.temp_data_list.push(dd);
        let n=this.temp_data_list.length;
        this.data.qty[n-1]=1;

      }

      this.get_total();

  }
  get_total(){
    this.data.tot=0;
    for(let i=0;i<this.temp_data_list.length;i++)
    {
      let qty=this.temp_data_list[i].qty;
      let sell_price=this.temp_data_list[i].sell_price;
      this.data.tot=this.data.tot+(qty*sell_price);
    }
  }
  delete_temp_product(index:any){
    this.temp_data_list.splice(index,1);
    this.get_total();
  }
  selectTable(event:any)
  {
    this.data.tb_no=event.tname;
  }
  selectCategory(event:any)
  {
    let id=event.cid;
    this.temp_product_list=[];
    for(let i=0;i<this.product_list.length;i++)
    {
      if(id==this.product_list[i].cid)
      {
        this.temp_product_list.push(this.product_list[i]);
      }
    }
  }
  onFocused(event:any)
  {

  }
  load_purchase_data_list(){

    this.sql.fetch_all(this.data.tb_name_purchase).subscribe((result) => {
      this.data.data_list=result;

      this.data.tot_rec=result.length;

    });
  }

  load_product_list()
  {
    this.sql.fetch_all(this.data.tb_name_product).subscribe((result) => {
      this.product_list=result;
      this.temp_product_list=result;
    });
  }
  load_category_list()
  {
    this.sql.fetch_all(this.data.tb_name_category).subscribe((result) => {
      this.category_list=result;
    });
  }
  load_table_list()
  {
    this.sql.fetch_all(this.data.tb_name_table).subscribe((result) => {
      this.table_list=result;
    });
  }







  qty_change(index:any){

    let new_val=this.data.qty[index];
    this.temp_data_list[index].qty=new_val;
   this.get_total();

  }
  delete_data(id:any)
  {

    for(let i=0;i<this.data.data_list.length;i++){
      if(this.data.data_list[i].pr_id==id){
 let name=this.data.data_list[i].bno;
      this.sms.print_confirm("Are Your Sure Want to Delete : "+name+" ? ")
      .then((result:any)=>{
                if(result.isConfirmed)
                {

                  this.sql.delete(this.data.tb_name_purchase,id).subscribe((res)=>{
                    console.log("after delete "+res );
                    this.data.data_list.splice(i,1);

                  });

                }else{

                }
         })

       break;

      }
  }

  }

edit(id:any){

  this.data.id_edit=id;
  this.data.pop_up=false;
  this.data.add_btn=true;
  this.data.reset_btn=true;
  this.data.close_btn=false;
  this.data.update_btn=false;
  this.data.reload_btn=false;

  for(let i=0;i<this.data.data_list.length;i++)
  {
    if(this.data.data_list[i].pr_id==id)
    {
        this.data.customer_name=this.data.data_list[i].vendor_name;
        this.data.customer_contact=this.data.data_list[i].vendor_contact;
        this.data.invoice_no=this.data.data_list[i].bno;
        this.data.remark=this.data.data_list[i].remark_purchase;
        this.data.invoice_date=this.data.data_list[i].b_date;
        this.data.discount=this.data.data_list[i].discount;
        this.temp_data_list=JSON.parse(this.data.data_list[i].product_data);
        this.data.back_up_list=JSON.parse(this.data.data_list[i].product_data);

        for(let j=0;j<this.temp_data_list.length;j++){
          this.data.qty[j]=this.temp_data_list[j].qty;
        }


        this.data.cash=this.data.data_list[i].cash;
        this.data.online=this.data.data_list[i].online;

        this.data.payment_sts=this.data.data_list[i].payment_sts;
        this.data.payment_mode=this.data.data_list[i].pay_mode;

       this.mode_change(this.data.data_list[i].pay_mode);
       this.status_change(this.data.data_list[i].payment_sts);


        break;
    }
  }
}

add()
{
  let time=this.db.get_date_time();


  let dd={
    bno:this.data.invoice_no,
    vendor_name:this.data.customer_name,
    vendor_contact:this.data.customer_contact,
    b_date:this.data.invoice_date,
    remark_purchase:this.data.remark,
    amount:this.data.tot,
    discount:this.data.discount,
    product_data:JSON.stringify(this.temp_data_list),
    payment_sts:this.data.payment_sts,
    pay_mode:this.data.payment_mode,
    cash:this.data.cash_received,
    online:this.data.online_received,
    save_date_bill:time
  };
  this.sql.add(this.data.tb_name_purchase,dd);




  if(this.data.purchase_in)
  {


    // to add update qty in product
    for(let i=0;i<this.temp_data_list.length;i++)
    {
     let pid=this.temp_data_list[i].pid;
     let o_qty=this.temp_data_list[i].qty;

     for(let j=0;j<this.product_list.length;j++)
     {
       if(this.product_list[j].pid==pid)
       {
         let new_qty=parseInt(this.product_list[j].qty)+parseInt(o_qty);

        let dd_up={
          pid:pid,
          cid:this.product_list[j].cid,
          pname:this.product_list[j].pname,
          p_img:this.product_list[j].p_img,
          sell_price:this.product_list[j].sell_price,
          buy_price:this.product_list[j].buy_price,
          qty:new_qty,
          item_code:this.product_list[j].item_code,
          save_date_product:time};
          console.log("Qty Add=>"+new_qty,dd_up);
          this.sql.update(this.data.tb_name_product,dd_up).subscribe((res)=>{
            console.log("Quantity Updated");
        });


       }
     }



    }
  }


}

load_setting()
{

      this.sql.fetch_all(this.data.tb_name_setting).subscribe((result:any) => {
        this.data.purchase_in=result[0].purchase_in;
      });
}

update()
{
  let time=this.db.get_date_time();
  let dd={
    pr_id:this.data.id_edit,
    bno:this.data.invoice_no,
    vendor_name:this.data.customer_name,
    vendor_contact:this.data.customer_contact,
    b_date:this.data.invoice_date,
    remark_purchase:this.data.remark,
    amount:this.data.tot,
    discount:this.data.discount,
    product_data:JSON.stringify(this.temp_data_list),
    payment_sts:this.data.payment_sts,
    pay_mode:this.data.payment_mode,
    cash:this.data.cash_received,
    online:this.data.online_received,
    save_date_bill:time,

  };
  this.sql.update(this.data.tb_name_purchase,dd).subscribe((res)=>{
    console.log(res);
  });

  if(this.data.purchase_in)
  {

// to undo change previous done
for(let i=0;i<this.data.back_up_list.length;i++)
    {
     let pid=this.data.back_up_list[i].pid;
     let o_qty=this.data.back_up_list[i].qty;

     for(let j=0;j<this.product_list.length;j++)
     {
       if(this.product_list[j].pid==pid)
       {
         let new_qty=parseInt(this.product_list[j].qty)-parseInt(o_qty);

        let dd_up={
          pid:pid,
          cid:this.product_list[j].cid,
          pname:this.product_list[j].pname,
          p_img:this.product_list[j].p_img,
          sell_price:this.product_list[j].sell_price,
          buy_price:this.product_list[j].buy_price,
          qty:new_qty,
          item_code:this.product_list[j].item_code,
          save_date_product:time};
          this.product_list[j].qty=new_qty;
          console.log("Qty Reduce=>"+new_qty,dd_up);
          this.sql.update(this.data.tb_name_product,dd_up).subscribe((res)=>{

        });


       }
     }
    }




    // code to update prodyct data
    for(let i=0;i<this.temp_data_list.length;i++)
    {
     let pid=this.temp_data_list[i].pid;
     let o_qty=this.temp_data_list[i].qty;

     for(let j=0;j<this.product_list.length;j++)
     {
       if(this.product_list[j].pid==pid)
       {
         let new_qty=parseInt(this.product_list[j].qty)+parseInt(o_qty);

        let dd_up={
          pid:pid,
          cid:this.product_list[j].cid,
          pname:this.product_list[j].pname,
          p_img:this.product_list[j].p_img,
          sell_price:this.product_list[j].sell_price,
          buy_price:this.product_list[j].buy_price,
          qty:new_qty,
          item_code:this.product_list[j].item_code,
          save_date_product:time};
          console.log("Qty Update=>"+new_qty,dd_up);
          this.sql.update(this.data.tb_name_product,dd_up).subscribe((res)=>{
            console.log("Quantity Updated");
        });


       }
      }
      }
    }




  this.load_purchase_data_list();

}
calculateDiff(from_date:any,to_date:any)
{
  from_date = new Date(from_date);
  to_date = new Date(to_date);
  return Math.floor((Date.UTC(from_date.getFullYear(), from_date.getMonth(), from_date.getDate()) - Date.UTC(to_date.getFullYear(), to_date.getMonth(), to_date.getDate()) ) /(1000 * 60 * 60 * 24));
}
generate_report()
{
  this.data.data_list=[];
  let from_date=this.data.from_date;
  let to_date=this.data.to_date;
    this.sql.fetch_all(this.data.tb_name_purchase).subscribe((response:any)=>{
        for(let i=0;i<response.length;i++){

          let rec_Date=response[i].b_date;
          let t1=this.calculateDiff(from_date,rec_Date);
          let t2=this.calculateDiff(to_date,rec_Date);

          if(t1<=0 && t2>=0){
            this.data.data_list.push(response[i])


          }

        }
  });
  this.data.tot_rec=this.data.data_list.length;
}
close()
{
  this.data.pop_up=true;
}
reset()
{

}
reload()
{

}

print_bill(pr_id:any)
{

}
}
