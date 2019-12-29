import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyBalanceComponent } from './money-balance.component';

describe('MoneyBalanceComponent', () => {
  let component: MoneyBalanceComponent;
  let fixture: ComponentFixture<MoneyBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
