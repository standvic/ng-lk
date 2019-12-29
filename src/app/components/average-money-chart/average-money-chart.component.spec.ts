import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageMoneyChartComponent } from './average-money-chart.component';

describe('AverageMoneyChartComponent', () => {
  let component: AverageMoneyChartComponent;
  let fixture: ComponentFixture<AverageMoneyChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageMoneyChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageMoneyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
