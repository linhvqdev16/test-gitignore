import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.scss'
})
export class SampleComponent  implements OnInit , AfterViewInit, OnDestroy{
   @Input() viewLoading$?: Observable<boolean>;
  @Input() viewLoading: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(private spinner: NgxSpinnerService){}

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

  ngShowSpinner(bol: boolean){
    this.viewLoading = bol;
  	if (bol) {
      this.spinner.show();
  	}else{
      this.spinner.hide();
    }
  }
  @Input() color: any;

}
