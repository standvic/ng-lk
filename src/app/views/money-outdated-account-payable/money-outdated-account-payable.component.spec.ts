import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyOutdatedAccountPayableComponent } from './money-outdated-account-payable.component';

describe('MoneyOutdatedAccountPayableComponent', () => {
  let component: MoneyOutdatedAccountPayableComponent;
  let fixture: ComponentFixture<MoneyOutdatedAccountPayableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyOutdatedAccountPayableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyOutdatedAccountPayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
