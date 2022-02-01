import { Component, Inject, InjectionToken, Input, OnInit, Output } from '@angular/core';
export interface EmployerComponentPopoutData {
  window?: Window;
  modalName: string;
  id: number;
  name?: string;
  founded?: string;
  employeeCount?: string;
  description?: string;
}

export const EMPLOYER_POPOUT_MODAL_DATA: InjectionToken<EmployerComponentPopoutData> =
  new InjectionToken<EmployerComponentPopoutData>('EMPLOYER_POPOUT_MODAL_DATA');
@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html'
})
export class EmployerComponent {
  constructor(
    @Inject(EMPLOYER_POPOUT_MODAL_DATA) readonly data: EmployerComponentPopoutData
  ) {
  }

  ngOnInit() {
    console.log(window)
    if (this.data.window) {
      this.data.window.resizeTo(400, 800);
      this.data.window.document.title = "goooooood";
      this.data.window.addEventListener('resize', (event)=> {
        this.data.window && this.data.window.resizeTo(400, 300);
        console.log("resize")
      })
    }
  }
}
