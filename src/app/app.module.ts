import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PortalModule } from '@angular/cdk/portal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployerComponent } from './employer/employer.component';
import { PopoutService } from './popout.service';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, PortalModule],
  exports: [CustomerComponent, EmployerComponent],
  entryComponents: [CustomerComponent, EmployerComponent],
  declarations: [AppComponent, CustomerComponent, EmployerComponent],
  providers: [PopoutService],
  bootstrap: [AppComponent],
})
export class AppModule {}
