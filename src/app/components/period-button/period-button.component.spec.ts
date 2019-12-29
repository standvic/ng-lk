import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodButtonComponent } from './period-button.component';

describe('PeriodButtonComponent', () => {
  let component: PeriodButtonComponent;
  let fixture: ComponentFixture<PeriodButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
