import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestDetailPageComponent } from './quest-detail-page.component';

describe('QuestDetailPageComponent', () => {
  let component: QuestDetailPageComponent;
  let fixture: ComponentFixture<QuestDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
