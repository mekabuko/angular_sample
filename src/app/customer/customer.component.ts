import {
  Component,
  Inject,
  InjectionToken,
} from '@angular/core';
export interface CustomerComponentPopoutData {
  window?: Window;
  modalName: string;
  id: number;
  name: string;
  age?: number;
  employer?: string;
}

export const CUSTOMER_POPOUT_MODAL_DATA: InjectionToken<CustomerComponentPopoutData> =
  new InjectionToken<CustomerComponentPopoutData>('CUSTOMER_POPOUT_MODAL_DATA');
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  window?: Window;
  id: number;
  age?: number;
  name: string;
  employer?: string;

  constructor(
    @Inject(CUSTOMER_POPOUT_MODAL_DATA) public data: CustomerComponentPopoutData
  ) {
    this.window = this.data.window;
    this.id = this.data.id;
    this.age = this.data.age;
    this.name = this.data.name;
    this.employer = this.data.employer;
  }

  ngOnInit() {
    console.log(window)
    if (this.window) {
      this.window.resizeTo(400, 800);
      this.window.document.title = "testesteste";
      this.window.addEventListener('resize', (event)=> {
        this.window && this.window.resizeTo(400, 800);
        console.log("resize")
      })
    }
  }
}
