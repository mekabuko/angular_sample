import {
  ComponentPortal,
  ComponentType,
  DomPortalOutlet,
} from '@angular/cdk/portal';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  InjectionToken,
  Injector,
  OnDestroy,
} from '@angular/core';

@Injectable()
export class PopoutService implements OnDestroy {
  styleSheetElement: any;
  POPOUT_MODALS: any = {};

  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef
  ) {}

  ngOnDestroy() {}

  openPopoutModal<T, K>(type: ComponentType<T>, token: InjectionToken<K> ,data: any) {
    const windowInstance = this.openOnce(Date.now().toString()); //TODO
    const newData = data;
    newData['window'] = windowInstance;

    // Wait for window instance to be created
    setTimeout(() => {
      windowInstance && this.createCDKPortal(type, token, newData, windowInstance);
    }, 1000);
  }

  openOnce(target: string) {
    // Open a blank "target" window
    // or get the reference to the existing "target" window
    // const winRef = window.open('', target, '', true);
    const winRef = window.open('', target, '_blank, width=10,height=10');
    // If the "target" window was just opened, change its url
    // if (winRef!.location.href === 'about:blank') {
    //   winRef!.location.href = url;
    // }
    return winRef;
  }

  createCDKPortal<T, K>(
    type: ComponentType<T>,
    token: InjectionToken<K>,
    data: any,
    windowInstance: Window
  ) {
    if (!windowInstance) return;
    // Create a PortalOutlet with the body of the new window document
    const outlet = new DomPortalOutlet(
      windowInstance.document.body,
      this.componentFactoryResolver,
      this.applicationRef,
      this.injector
    );
    windowInstance.document.body.innerText = '';

    // Create an injector with modal data
    const injector = this.createInjector(token, data);

    // Attach the portal
    const componentInstance = this.attachContainer(type, outlet, injector);

    // Copy styles from parent window
    document.querySelectorAll('style').forEach((htmlElement) => {
      windowInstance.document.head.appendChild(htmlElement.cloneNode(true));
    });
    // // Copy stylesheet link from parent window
    this.styleSheetElement = this.getStyleSheetElement();
    windowInstance.document.head.appendChild(this.styleSheetElement);

    // TODO
    this.POPOUT_MODALS['windowInstance'] = [...this.POPOUT_MODALS['windowInstance'], windowInstance];
    this.POPOUT_MODALS['outlet'] = [...this.POPOUT_MODALS['outlet'], outlet];
    this.POPOUT_MODALS['componentInstance'] = [...this.POPOUT_MODALS['componentInstance'], componentInstance];
    // };
  }

  isPopoutWindowOpen() {
    return (
      this.POPOUT_MODALS['windowInstance'] && !this.POPOUT_MODALS['windowInstance'].closed
    );
  }

  focusPopoutWindow() {
    this.POPOUT_MODALS['windowInstance'].focus();
  }

  closePopoutModal() {
    Object.keys(this.POPOUT_MODALS).forEach((modalName) => {
      if (this.POPOUT_MODALS['windowInstance']) {
        this.POPOUT_MODALS['windowInstance'].close();
      }
    });
  }

  attachContainer<T>(
    type: ComponentType<T>,
    outlet: DomPortalOutlet,
    injector: Injector
  ) {
    const containerPortal = new ComponentPortal(type, null, injector);
    const containerRef: ComponentRef<T> = outlet.attach(containerPortal);
    return containerRef.instance;
  }

  createInjector<T>(token: InjectionToken<T>, data: any): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [{ provide: token, useValue: data }],
    });
  }

  getStyleSheetElement() {
    const styleSheetElement = document.createElement('link');
    document.querySelectorAll('link').forEach((htmlElement) => {
      if (htmlElement.rel === 'stylesheet') {
        const absoluteUrl = new URL(htmlElement.href).href;
        styleSheetElement.rel = 'stylesheet';
        styleSheetElement.href = absoluteUrl;
      }
    });
    console.log(styleSheetElement.sheet);
    return styleSheetElement;
  }
}
