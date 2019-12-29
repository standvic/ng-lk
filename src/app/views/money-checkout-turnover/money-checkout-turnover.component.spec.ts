import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyCheckoutTurnoverComponent } from './money-checkout-turnover.component';

describe('MoneyCheckoutTurnoverComponent', () => {
  let component: MoneyCheckoutTurnoverComponent;
  let fixture: ComponentFixture<MoneyCheckoutTurnoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyCheckoutTurnoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyCheckoutTurnoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
