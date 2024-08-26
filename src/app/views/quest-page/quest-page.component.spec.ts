import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestPageComponent } from './quest-page.component';

describe('QuestPageComponent', () => {
  let component: QuestPageComponent;
  let fixture: ComponentFixture<QuestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
