import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AllAdminComponent } from './all-admin/all-admin.component';
import { AllCategoryComponent } from './all-category/all-category.component';
import { AllProductComponent } from './all-product/all-product.component';
import { AllTableComponent } from './all-table/all-table.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { PendingRequestComponent } from './pending-request/pending-request.component';
import { ProfitLossReportComponent } from './profit-loss-report/profit-loss-report.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ReportsComponent } from './reports/reports.component';

import { SalesComponent } from './sales/sales.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:"login",
    component:AdminLoginComponent
  },

  {
    path:"home",
    component:AdminHomeComponent,
    children:[
      {
        path:'dashboard',
        component:AdminDashboardComponent
      },
      {
        path:'pending_request',
        component:PendingRequestComponent
      },
      {
        path:'reports',
        component:ReportsComponent,
        children:[

          {
            path:'profit_loss_report',
            component:ProfitLossReportComponent
          }
        ]
      },
      {
        path:'sales',
        component:SalesComponent
      },
      {
        path:'inventory',
        component:InventoryComponent
      },
      {
        path:'purchase',
        component:PurchaseComponent
      },
      {
        path:'setting',
        component:SettingComponent
      },
      {
        path:'all_product',
        component:AllProductComponent
       },
       {
        path:'all_table',
        component:AllTableComponent
       },

       {
        path:'all_category',
        component:AllCategoryComponent
       },
       {
         path:'all_admin',
         component:AllAdminComponent
       },
       {
        path:'login',
        component:LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
