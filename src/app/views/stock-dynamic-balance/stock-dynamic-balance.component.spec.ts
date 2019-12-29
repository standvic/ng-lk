import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDynamicBalanceComponent } from './stock-dynamic-balance.component';

describe('StockDynamicBalanceComponent', () => {
  let component: StockDynamicBalanceComponent;
  let fixture: ComponentFixture<StockDynamicBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDynamicBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDynamicBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
