import { DatePipe } from '@angular/common';

import { Component, OnInit, ViewChild } from '@angular/core';
import { DbService } from '../services/db.service';
import { SmsService } from '../services/sms.service';
import { SqlService } from '../services/sql.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-profit-loss-report',
  templateUrl: './profit-loss-report.component.html',
  styleUrls: ['./profit-loss-report.component.scss']
})
export class ProfitLossReportComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  data:any=[];
  chart_data:any=[];

  pieChartType:ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ "Purchase","Sales" ],
    datasets: [ {
      data: this.chart_data
    } ]
  }


  constructor(
    private sql:SqlService,
    private db:DbService,
    private sms:SmsService,
    private datepipe:DatePipe
  )
   {
     this.data.analysis1=false;
    this.data.tb_list=this.db.get_table_names();
    this.data.tb_name_product=this.data.tb_list[0].product_tb;
    this.data.tb_name_purchase=this.data.tb_list[0].all_purchase_tb;
    this.data.tb_name_setting=this.data.tb_list[0].setting_tb;
    this.data.tb_name_sales=this.data.tb_list[0].all_sales_tb;

   }

  ngOnInit(): void {
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

      this.sql.fetch_all(this.data.tb_name_sales).subscribe((response:any)=>{
        var tot_sale=0;
        var tot_discount=0;
          for(let i=0;i<response.length;i++)
          {
            let t_r=response[i].save_date_bill.split(",");
            let dt=t_r[0].trim().split("-");
            let new_date=dt[2]+"/"+dt[1]+"/"+dt[0];
            var rec_Date:any=new Date(new_date);

            let t1=this.calculateDiff(from_date,rec_Date);
            let t2=this.calculateDiff(to_date,rec_Date);

            if(t1<=0 && t2>=0){
              tot_sale=tot_sale+parseInt(response[i].amount);
              tot_discount=tot_discount+parseInt(response[i].discount);
            }
          }
          tot_sale=tot_sale+tot_discount;
        this.data.sales=tot_sale;
    });



    this.sql.fetch_all(this.data.tb_name_purchase).subscribe((response:any)=>{
      var tot_purchase=0;
      var tot_discount_p=0;
      console.log("purchase Records",response);
        for(let i=0;i<response.length;i++){
          let t_r=response[i].save_date_bill.split(",");
          let dt=t_r[0].trim().split("-");
          let new_date=dt[2]+"/"+dt[1]+"/"+dt[0];
          var rec_Date:any=new Date(new_date);

          let t1=this.calculateDiff(from_date,rec_Date);
          let t2=this.calculateDiff(to_date,rec_Date);

          if(t1<=0 && t2>=0){
            tot_purchase=tot_purchase+parseInt(response[i].amount);
            tot_discount_p=tot_discount_p+parseInt(response[i].discount);
          }
        }
        this.data.purchase=tot_purchase=tot_purchase-tot_discount_p;
        this.chart_data=[tot_purchase,this.data.Sales];
        console.log(this.chart_data);
        console.log("Total Purchase "+this.data.purchase);
        console.log("Total Sales "+this.data.Sales);
        this.data.analysis1=true;
  });

  }
}
