import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceCycleChartComponent } from './finance-cycle-chart.component';

describe('FinanceCycleChartComponent', () => {
  let component: FinanceCycleChartComponent;
  let fixture: ComponentFixture<FinanceCycleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceCycleChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceCycleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
