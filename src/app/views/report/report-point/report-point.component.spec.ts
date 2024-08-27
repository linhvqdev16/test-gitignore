import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPointComponent } from './report-point.component';

describe('ReportPointComponent', () => {
  let component: ReportPointComponent;
  let fixture: ComponentFixture<ReportPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportPointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
