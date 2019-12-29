import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyAccountPivotgridComponent } from './money-account-pivotgrid.component';

describe('MoneyAccountPivotgridComponent', () => {
  let component: MoneyAccountPivotgridComponent;
  let fixture: ComponentFixture<MoneyAccountPivotgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyAccountPivotgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyAccountPivotgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
