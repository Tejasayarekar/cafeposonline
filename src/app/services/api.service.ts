import { UrlService } from './url.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
const httpOptions_upload = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}),

};

@Injectable({
  providedIn: 'root'
})
export class APIService {

  data:any=[];
  constructor(
    private HTTP:HttpClient,
    private url:UrlService
    )
  {
    this.data.modal_url=this.url.get_modal_url();
  }

  post_api(dd:any)
  {
   return this.HTTP.post<any>(this.data.modal_url,dd,httpOptions);
  }

  image_upload_api(dd:any){
    return this.HTTP.post<any>(this.data.modal_url,dd,httpOptions_upload);
  }

}
