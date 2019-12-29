import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyAccountOverdurePivotgridComponent } from './money-account-overdure-pivotgrid.component';

describe('MoneyAccountOverdurePivotgridComponent', () => {
  let component: MoneyAccountOverdurePivotgridComponent;
  let fixture: ComponentFixture<MoneyAccountOverdurePivotgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyAccountOverdurePivotgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyAccountOverdurePivotgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
