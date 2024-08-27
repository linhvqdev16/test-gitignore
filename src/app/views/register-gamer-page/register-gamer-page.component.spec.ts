import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGamerPageComponent } from './register-gamer-page.component';

describe('RegisterGamerPageComponent', () => {
  let component: RegisterGamerPageComponent;
  let fixture: ComponentFixture<RegisterGamerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterGamerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterGamerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
