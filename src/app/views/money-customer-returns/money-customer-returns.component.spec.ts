import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyCustomerReturnsComponent } from './money-customer-returns.component';

describe('MoneyCustomerReturnsComponent', () => {
  let component: MoneyCustomerReturnsComponent;
  let fixture: ComponentFixture<MoneyCustomerReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyCustomerReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyCustomerReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
