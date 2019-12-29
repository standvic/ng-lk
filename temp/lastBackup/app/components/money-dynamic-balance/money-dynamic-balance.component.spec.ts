import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyDynamicBalanceComponent } from './money-dynamic-balance.component';

describe('MoneyDynamicBalanceComponent', () => {
  let component: MoneyDynamicBalanceComponent;
  let fixture: ComponentFixture<MoneyDynamicBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyDynamicBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyDynamicBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
