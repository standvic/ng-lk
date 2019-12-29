import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedProfitChartComponent } from './grouped-profit-chart.component';

describe('GroupedProfitChartComponent', () => {
  let component: GroupedProfitChartComponent;
  let fixture: ComponentFixture<GroupedProfitChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedProfitChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedProfitChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
