import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDeliveryDebtsTurnoverComponent } from './purchase-delivery-debts-turnover.component';

describe('PurchaseDeliveryDebtsTurnoverComponent', () => {
  let component: PurchaseDeliveryDebtsTurnoverComponent;
  let fixture: ComponentFixture<PurchaseDeliveryDebtsTurnoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseDeliveryDebtsTurnoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseDeliveryDebtsTurnoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
