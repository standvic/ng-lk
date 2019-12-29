import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitTrendsComponent } from './profit-trends.component';

describe('ProfitTrendsComponent', () => {
  let component: ProfitTrendsComponent;
  let fixture: ComponentFixture<ProfitTrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitTrendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
