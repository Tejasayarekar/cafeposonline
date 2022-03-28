import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelDataService {

  constructor(
    private HTTP:HttpClient,
    private url:UrlService
  ) { }

  generate(id:any,name:any){
    const ws:XLSX.WorkSheet=XLSX.utils.table_to_sheet(id);
    const wb:XLSX.WorkBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
    XLSX.writeFile(wb,name);
  }

generate_feedback_excel(response_data:any,file_name:any){
  const ws:XLSX.WorkSheet=XLSX.utils.json_to_sheet(response_data);
  const wb:XLSX.WorkBook=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
  XLSX.writeFile(wb,file_name);
}

  async get_excel_data(event:any,tb_name:any,md_name:any){
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      var data:any=[];
      data= XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      // Data will be logged in array format containing objects
      console.log(data[0].q1);

        let site_url=this.url.get_modal_url();
        let dd={modal:"demo",sub_modal:md_name,'val_list':data,'tb_name':tb_name};
        this.HTTP.post<any>(site_url,dd).subscribe((res:any)=>{
          return res;
          console.log("Response",res);

        },(err:any)=>{
          console.log("Error "+err.message+"\n"+err.error);

        });


      // return ds;

    };
  }

}
