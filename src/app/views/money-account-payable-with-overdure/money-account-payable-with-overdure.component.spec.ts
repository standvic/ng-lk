import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyAccountPayableWithOverdureComponent } from './money-account-payable-with-overdure.component';

describe('MoneyAccountPayableWithOverdureComponent', () => {
  let component: MoneyAccountPayableWithOverdureComponent;
  let fixture: ComponentFixture<MoneyAccountPayableWithOverdureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyAccountPayableWithOverdureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyAccountPayableWithOverdureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
