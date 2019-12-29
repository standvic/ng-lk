import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyOutdatedAccountReceivableComponent } from './money-outdated-account-receivable.component';

describe('MoneyOutdatedAccountReceivableComponent', () => {
  let component: MoneyOutdatedAccountReceivableComponent;
  let fixture: ComponentFixture<MoneyOutdatedAccountReceivableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyOutdatedAccountReceivableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyOutdatedAccountReceivableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
