import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyDynamicChartComponent } from './money-dynamic-chart.component';

describe('MoneyDynamicChartComponent', () => {
  let component: MoneyDynamicChartComponent;
  let fixture: ComponentFixture<MoneyDynamicChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyDynamicChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyDynamicChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
