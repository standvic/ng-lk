import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowAnalysisChartComponent } from './cash-flow-analysis-chart.component';

describe('CashFlowAnalysisChartComponent', () => {
  let component: CashFlowAnalysisChartComponent;
  let fixture: ComponentFixture<CashFlowAnalysisChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashFlowAnalysisChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashFlowAnalysisChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
