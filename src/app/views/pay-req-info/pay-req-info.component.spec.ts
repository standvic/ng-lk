import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayReqInfoComponent } from './pay-req-info.component';

describe('PayReqInfoComponent', () => {
  let component: PayReqInfoComponent;
  let fixture: ComponentFixture<PayReqInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayReqInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayReqInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
