import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInstallComponent } from './report-install.component';

describe('ReportInstallComponent', () => {
  let component: ReportInstallComponent;
  let fixture: ComponentFixture<ReportInstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportInstallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
