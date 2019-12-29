import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyAccountOutdatedPivotgridComponent } from './money-account-outdated-pivotgrid.component';

describe('MoneyAccountOutdatedPivotgridComponent', () => {
  let component: MoneyAccountOutdatedPivotgridComponent;
  let fixture: ComponentFixture<MoneyAccountOutdatedPivotgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyAccountOutdatedPivotgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyAccountOutdatedPivotgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
