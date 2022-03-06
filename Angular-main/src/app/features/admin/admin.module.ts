import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    AdminHomepageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
