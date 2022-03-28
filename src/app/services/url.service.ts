import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }


    main_url="https://myblogsspot.co.in/CAFEE_ONLINE";
    modal_url=this.main_url+"/modal/modal.php";
    img_url=this.main_url+"/img/";
    teach_img_url=this.main_url+"/img/teacher/";
    excel_url=this.main_url+"/excel/";

    get_main_url(){
      return this.main_url;

    }
    get_img_url(){
      return this.img_url;

    }
    get_modal_url(){
      return this.modal_url;
    }

  }

