import { Component, HostListener } from '@angular/core';
import { PopoutService } from './service/popout.service';
import {
  CustomerComponent,
  CustomerComponentPopoutData,
  CUSTOMER_POPOUT_MODAL_DATA,
} from './customer/customer.component';
import { EmployerComponent, EMPLOYER_POPOUT_MODAL_DATA, EmployerComponentPopoutData } from './employer/employer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  customerDetails: any = {};
  companyDetails: any = {};

  constructor(private popoutService: PopoutService) {
    this.customerDetails = {
      Jessica: {
        id: '1111',
        age: 35,
        employer: 'ABCD Bank',
      },
      Mark: {
        id: '2222',
        age: 45,
        employer: 'XY Holdings',
      },
    };
    this.companyDetails = {
      'ABCD Bank': {
        id: 2020,
        founded: 1982,
        employeeCount: 20000,
        description:
          'ABCD Bank provides wide variety of innovative banking products and services. ' +
          'We are located in several regions of California and Florida. ',
      },
      'XY Holdings': {
        id: 2021,
        founded: 2000,
        employeeCount: 10000,
        description:
          'XY Holdings Ltd. provides hosting services, custom software solutions, and an import/export division.',
      },
    };
  }

  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: Event) {
    this.popoutService.closePopoutModal();
  }

  openCustomerPopout(name: string) {
    const modalData: CustomerComponentPopoutData = {
      modalName: 'Customer',
      name: name,
      id: this.customerDetails[name].id,
      age: this.customerDetails[name].age,
      employer: this.customerDetails[name].employer,
    };

    // if (!this.popoutService.isPopoutWindowOpen()) {
      this.popoutService.openPopoutModal(
        CustomerComponent,
        CUSTOMER_POPOUT_MODAL_DATA,
        modalData
      );
    // } else {
    //   const sameCustomer = POPOUT_MODALS['componentInstance'].name === name;
    //   // When popout modal is open and there is no change in data, focus on popout modal
    //   if (sameCustomer) {
    //     this.popoutService.focusPopoutWindow();
    //   } else {
    //     POPOUT_MODALS['outlet'].detach();
    //     const injector = this.popoutService.createInjector(
    //       CUSTOMER_POPOUT_MODAL_DATA,
    //       modalData
    //     );
    //     const componentInstance = this.popoutService.attachContainer(
    //       CustomerComponent,
    //       POPOUT_MODALS['outlet'],
    //       injector
    //     );
    //     POPOUT_MODALS['componentInstance'] = componentInstance;
    //     this.popoutService.focusPopoutWindow();
    //   }
    // }
  }

  openEmployerPopout(name: string) {
    const modalData: EmployerComponentPopoutData = {
      modalName: 'Employer',
      name: name,
      id: this.companyDetails[name].id,
      description: this.companyDetails[name].description,
      founded: this.companyDetails[name].founded,
      employeeCount: this.companyDetails[name].employeeCount
    };
    // if (!this.popoutService.isPopoutWindowOpen()) {
      this.popoutService.openPopoutModal(
        EmployerComponent,
        EMPLOYER_POPOUT_MODAL_DATA,
        modalData
      );
    // } else {
    //   const sameCustomer = POPOUT_MODALS['componentInstance'].name === name;
    //   // When popout modal is open and there is no change in data, focus on popout modal
    //   if (sameCustomer) {
    //     this.popoutService.focusPopoutWindow();
    //   } else {
    //     POPOUT_MODALS['outlet'].detach();
    //     const injector = this.popoutService.createInjector(modalData);
    //     const componentInstance = this.popoutService.attachEmployerContainer(POPOUT_MODALS['outlet'], injector);
    //     POPOUT_MODALS['componentInstance'] = componentInstance;
    //     this.popoutService.focusPopoutWindow();
    //   }
    // }
  }
}
