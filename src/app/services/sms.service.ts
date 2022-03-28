import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor() { }
  print_success(message:any){
    Swal.fire({
      icon: 'success',
      title: message,
      text: ""
    })
  }

  print_error(message:any){
    Swal.fire({
      icon: 'error',
      title: message,
      text: ""
    })
  }

  print_confirm(title:any){
   return  Swal.fire({
      icon:'question',
      title:title,
      showConfirmButton:true,
      showCancelButton:true
    })

  }
}
