import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDepositsComponent } from './report-deposits.component';

describe('ReportDepositsComponent', () => {
  let component: ReportDepositsComponent;
  let fixture: ComponentFixture<ReportDepositsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportDepositsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
