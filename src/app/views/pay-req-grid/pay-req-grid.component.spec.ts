import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayReqGridComponent } from './pay-req-grid.component';

describe('PayReqGridComponent', () => {
  let component: PayReqGridComponent;
  let fixture: ComponentFixture<PayReqGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayReqGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayReqGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
