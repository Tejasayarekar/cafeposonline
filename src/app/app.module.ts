import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminResetPassComponent } from './admin-reset-pass/admin-reset-pass.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddDataComponent } from './add-data/add-data.component';
import { AllProductComponent } from './all-product/all-product.component';
import { AllAdminComponent } from './all-admin/all-admin.component';
import { AllCategoryComponent } from './all-category/all-category.component';
import { AllLogsComponent } from './all-logs/all-logs.component';
import { AllTableComponent } from './all-table/all-table.component';
import { AllCompanyComponent } from './all-company/all-company.component';
import { SettingComponent } from './setting/setting.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SalesComponent } from './sales/sales.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ReportsComponent } from './reports/reports.component';
import { FormsModule } from '@angular/forms';
import { PendingRequestComponent } from './pending-request/pending-request.component';
import { HttpClientModule } from '@angular/common/http';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ProfitLossReportComponent } from './profit-loss-report/profit-loss-report.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxPrintModule } from 'ngx-print';
import { LoginComponent } from './login/login.component';



const dbConfig: DBConfig  = {
  name: 'pos_data',
  version: 5,
  objectStoresMeta: [
    {
    store: 'product',
    storeConfig: { keyPath: 'pid', autoIncrement: true },
    storeSchema:
    [
      { name: 'cid', keypath: 'cid', options: { unique: false } },
      { name: 'pname', keypath: 'pname', options: { unique: false } },
      { name: 'p_img', keypath: 'p_img', options: { unique: false } },
      { name: 'sell_price', keypath: 'sell_price', options: { unique: false } },
      { name: 'buy_price', keypath: 'buy_price', options: { unique: false } },
      { name: 'qty', keypath: 'qty', options: { unique: false } },
      { name: 'item_code', keypath: 'item_code', options: { unique: false } },
      { name: 'save_date_product', keypath: 'save_date_product', options: { unique: false } }
    ]
   },
   {
    store: 'category',
    storeConfig: { keyPath: 'cid', autoIncrement: true },
    storeSchema:
    [
      { name: 'cname', keypath: 'cname', options: { unique: false } },
      { name: 'c_img', keypath: 'c_img', options: { unique: false } },
      { name: 'save_date_category', keypath: 'save_date_category', options: { unique: false } }
    ]
   },
   {
    store: 'table',
    storeConfig: { keyPath: 'tid', autoIncrement: true },
    storeSchema:
    [
      { name: 'tname', keypath: 'tname', options: { unique: false } },
      { name: 'capacity', keypath: 'capacity', options: { unique: false } },
      { name: 'save_date_tb', keypath: 'save_date_tb', options: { unique: false } }
    ]
   }
   ,
   {
    store: 'all_users',
    storeConfig: { keyPath: 'aid', autoIncrement: true },
    storeSchema:
    [
      { name: 'uname', keypath: 'uname', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: false } },
      { name: 'pass', keypath: 'pass', options: { unique: false } },
      { name: 'type', keypath: 'type', options: { unique: false } },
      { name: 'acc_add', keypath: 'acc_add', options: { unique: false } },
      { name: 'acc_edit', keypath: 'acc_edit', options: { unique: false } },
      { name: 'acc_delete', keypath: 'acc_delete', options: { unique: false } },
      { name: 'acc_menu', keypath: 'acc_menu', options: { unique: false } }
    ]
   }
   ,
   {
    store: 'all_sales',
    storeConfig: { keyPath: 'sid', autoIncrement: true },
    storeSchema:
    [
      { name: 'b_prefix', keypath: 'b_prefix', options: { unique: false } },
      { name: 'tid', keypath: 'tid', options: { unique: false } },
      { name: 'amount', keypath: 'amount', options: { unique: false } },
      { name: 'discount', keypath: 'discount', options: { unique: false } },
      { name: 'product_data', keypath: 'product_data', options: { unique: false } },
      { name: 'payment_sts', keypath: 'payment_sts', options: { unique: false } },
      { name: 'pay_mode', keypath: 'pay_mode', options: { unique: false } },
      { name: 'cash', keypath: 'cash', options: { unique: false } },
      { name: 'online', keypath: 'online', options: { unique: false } },
      { name: 'save_date_bill', keypath: 'save_date_bill', options: { unique: false } }
    ]
   }
   ,
   {
    store: 'all_purchase',
    storeConfig: { keyPath: 'pr_id', autoIncrement: true },
    storeSchema:
    [
      { name: 'bno', keypath: 'bno', options: { unique: false } },
      { name: 'vendor_name', keypath: 'vendor_name', options: { unique: false } },
      { name: 'vendor_contact', keypath: 'vendor_name', options: { unique: false } },
      { name: 'b_date', keypath: 'b_date', options: { unique: false } },
      { name: 'amount', keypath: 'amount', options: { unique: false } },
      { name: 'discount', keypath: 'discount', options: { unique: false } },
      { name: 'product_data', keypath: 'product_data', options: { unique: false } },
      { name: 'payment_sts', keypath: 'payment_sts', options: { unique: false } },
      { name: 'pay_mode', keypath: 'pay_mode', options: { unique: false } },
      { name: 'remark_purchase', keypath: 'remark_purchase', options: { unique: false } },
      { name: 'save_date_bill', keypath: 'save_date_bill', options: { unique: false } }
    ]
   },
   {
    store: 'setting',
    storeConfig: { keyPath: 'st_id', autoIncrement: true },
    storeSchema:
    [
      { name: 'cafe_name', keypath: 'cafe_name', options: { unique: false } },
      { name: 'cafe_address', keypath: 'cafe_address', options: { unique: false } },
      { name: 'tag_line', keypath: 'tag_line', options: { unique: false } },
      { name: 'bill_prefix', keypath: 'bill_prefix', options: { unique: false } },
      { name: 'purchase_in', keypath: 'purchase_in', options: { unique: false } },
      { name: 'sales_in', keypath: 'sales_in', options: { unique: false } }
    ]
   },
   {
    store: 'images',
    storeConfig: { keyPath: 'img_id', autoIncrement: true },
    storeSchema:
    [
      { name: 'img_name', keypath: 'img_name', options: { unique: false } },
      { name: 'img_data', keypath: 'img_data', options: { unique: false } },
      { name: 'img_for', keypath: 'img_for', options: { unique: false } }
    ]
   }
]
};

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    AdminResetPassComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AdminDashboardComponent,
    AddDataComponent,
    AllProductComponent,
    AllAdminComponent,
    AllCategoryComponent,
    AllLogsComponent,
    AllTableComponent,
    AllCompanyComponent,
    SettingComponent,
    PurchaseComponent,
    SalesComponent,
    InventoryComponent,
    ReportsComponent,
    PendingRequestComponent,
    ProfitLossReportComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AutocompleteLibModule,
    NgChartsModule,
    NgxPrintModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
