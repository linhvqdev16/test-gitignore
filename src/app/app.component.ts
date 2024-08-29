import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as AOS from 'aos'
import { SampleComponent } from './views/sample/sample.component';
import {ColorPickerDirective} from 'ngx-color-picker';
import { SpinnerPageComponent } from './views/defaults/spinner/spinner-page/spinner-page.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  title = 'VTC Mobile Influencer';

  private isBrowser?: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: string  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      AOS.init({ once: true, duration: 1000 });
    }
  }

}

// export class AppComponent implements AfterViewInit, OnInit{
//   primary = '#1976d2';


//   @ViewChild('spinnerPageComponent')
//   spinnerPageComponent?: SpinnerPageComponent;

//   @ViewChild(SampleComponent)
//   sampleComponent?: SampleComponent;

//   @ViewChild('primaryColorSample', {read: ElementRef})
//   primarySampleDiv?: ElementRef;

//   @ViewChild('primaryInput')
//   primaryInput?: ElementRef;

//   @ViewChild('primaryInput', {read: ColorPickerDirective})
//   colorPickerDirective?: ColorPickerDirective;

//   ngAfterViewInit() {
//     this.sampleComponent?.ngShowSpinner(true);
//   }
//   ngOnInit(): void {
//     this.sampleComponent?.ngShowSpinner(true);
//   }

//   openColorPicker() {
//     debugger;
//     this.spinnerPageComponent?.onTest(); 
//   }
// }