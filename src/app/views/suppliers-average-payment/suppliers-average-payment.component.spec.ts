import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersAveragePaymentComponent } from './suppliers-average-payment.component';

describe('SuppliersAveragePaymentComponent', () => {
  let component: SuppliersAveragePaymentComponent;
  let fixture: ComponentFixture<SuppliersAveragePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersAveragePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersAveragePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
