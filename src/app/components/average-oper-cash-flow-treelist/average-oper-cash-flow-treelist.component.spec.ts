import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageOperCashFlowTreelistComponent } from './average-oper-cash-flow-treelist.component';

describe('AverageOperCashFlowTreelistComponent', () => {
  let component: AverageOperCashFlowTreelistComponent;
  let fixture: ComponentFixture<AverageOperCashFlowTreelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageOperCashFlowTreelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageOperCashFlowTreelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
