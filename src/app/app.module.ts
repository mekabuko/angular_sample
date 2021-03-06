import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PortalModule } from '@angular/cdk/portal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployerComponent } from './employer/employer.component';
import { PopoutService } from './service/popout.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    PortalModule,
    BrowserAnimationsModule,
    DragDropModule,
  ],
  exports: [CustomerComponent, EmployerComponent],
  entryComponents: [CustomerComponent, EmployerComponent],
  declarations: [AppComponent, CustomerComponent, EmployerComponent],
  providers: [PopoutService],
  bootstrap: [AppComponent],
})
export class AppModule {}
