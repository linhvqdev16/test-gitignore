import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner-page',
  templateUrl: './spinner-page.component.html',
  styleUrl: './spinner-page.component.scss'
})
export class SpinnerPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() viewLoading$?: Observable<boolean>;
  @Input() viewLoading: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(private spinner: NgxSpinnerService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
  ngAfterViewInit(): void {
    if (this.viewLoading$) {
      const loadingSubscription = this.viewLoading$.subscribe(res => this.ngShowSpinner(res));
      this.subscriptions.push(loadingSubscription);
    } else {
      this.ngShowSpinner(this.viewLoading);
    }
  }
  ngOnInit(): void {
  }

  ngShowSpinner(_incomeBoolean: boolean) {
    if (_incomeBoolean) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }
}
