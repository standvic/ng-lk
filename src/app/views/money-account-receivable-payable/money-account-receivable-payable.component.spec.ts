import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyAccountReceivablePayableComponent } from './money-account-receivable-payable.component';

describe('MoneyAccountReceivablePayableComponent', () => {
  let component: MoneyAccountReceivablePayableComponent;
  let fixture: ComponentFixture<MoneyAccountReceivablePayableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyAccountReceivablePayableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyAccountReceivablePayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
