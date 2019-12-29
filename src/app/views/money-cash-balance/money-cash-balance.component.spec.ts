import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyCashBalanceComponent } from './money-cash-balance.component';

describe('MoneyCashBalanceComponent', () => {
  let component: MoneyCashBalanceComponent;
  let fixture: ComponentFixture<MoneyCashBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyCashBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyCashBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
