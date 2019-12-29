import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyAccountPayableComponent } from './money-account-payable.component';

describe('MoneyAccountPayableComponent', () => {
  let component: MoneyAccountPayableComponent;
  let fixture: ComponentFixture<MoneyAccountPayableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyAccountPayableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyAccountPayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
