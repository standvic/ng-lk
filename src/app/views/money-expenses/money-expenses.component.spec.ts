import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyExpensesComponent } from './money-expenses.component';

describe('MoneyExpensesComponent', () => {
  let component: MoneyExpensesComponent;
  let fixture: ComponentFixture<MoneyExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
