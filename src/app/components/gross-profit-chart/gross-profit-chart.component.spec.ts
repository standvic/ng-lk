import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrossProfitChartComponent } from './gross-profit-chart.component';

describe('GrossProfitChartComponent', () => {
  let component: GrossProfitChartComponent;
  let fixture: ComponentFixture<GrossProfitChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrossProfitChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrossProfitChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
