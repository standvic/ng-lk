import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyAccountReceivableWithOverdureComponent } from './money-account-receivable-with-overdure.component';

describe('MoneyAccountReceivableWithOverdureComponent', () => {
  let component: MoneyAccountReceivableWithOverdureComponent;
  let fixture: ComponentFixture<MoneyAccountReceivableWithOverdureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyAccountReceivableWithOverdureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyAccountReceivableWithOverdureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
