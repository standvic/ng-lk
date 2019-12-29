import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraceReceivableGaugeComponent } from './grace-receivable-gauge.component';

describe('GraceReceivableGaugeComponent', () => {
  let component: GraceReceivableGaugeComponent;
  let fixture: ComponentFixture<GraceReceivableGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraceReceivableGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraceReceivableGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
