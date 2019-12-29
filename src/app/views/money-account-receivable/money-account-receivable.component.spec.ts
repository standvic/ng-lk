import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyAccountReceivableComponent } from './money-account-receivable.component';

describe('MoneyAccountReceivableComponent', () => {
  let component: MoneyAccountReceivableComponent;
  let fixture: ComponentFixture<MoneyAccountReceivableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyAccountReceivableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyAccountReceivableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
