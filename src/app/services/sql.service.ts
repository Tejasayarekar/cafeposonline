import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';


@Injectable({
  providedIn: 'root'
})
export class SqlService {

  constructor(private db_service:NgxIndexedDBService)
  {

   }
   add(table_name:any,tb_data:any)
   {
    this.db_service
    .add(table_name, tb_data)
    .subscribe((key) => {
      console.log('key: ', key);
    });
   }


   addAll(table_name:any,tb_data:any){
    this.db_service
    .bulkAdd(table_name, tb_data)
    .subscribe((result) => {
      console.log('result: ', result);
    });
   }

   multiDelete(table_name:any,dt:any)
   {
    return this.db_service.bulkDelete(table_name, dt);
   }

    multiGet(table_name:any,keys:any){
    return  this.db_service.bulkGet(table_name,keys);
    }

    update(table_name:any,val:any){
         return this.db_service.update(table_name,val);
      }

   fetch(table_name:any,key:any){
    this.db_service.getByKey(table_name, key).subscribe((people) => {
      console.log("list Is here",people);
    });
   }

    getCount(table_name:any)
    {
    return this.db_service.count(table_name);
    }

    delete(table_name:any,key:any){
      return this.db_service.delete(table_name, key);
    }


   fetch_all(table_name:any){
    return this.db_service.getAll(table_name);
   }

   fetch_by_val(table_name:any,col:any,val:any)
   {
   return this.db_service.getByIndex(table_name, col,val);
   }


}
