import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCommonComponent } from './report-common.component';

describe('ReportCommonComponent', () => {
  let component: ReportCommonComponent;
  let fixture: ComponentFixture<ReportCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportCommonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
