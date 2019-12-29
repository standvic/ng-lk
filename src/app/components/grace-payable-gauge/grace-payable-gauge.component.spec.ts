import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GracePayableGaugeComponent } from './grace-payable-gauge.component';

describe('GracePayableGaugeComponent', () => {
  let component: GracePayableGaugeComponent;
  let fixture: ComponentFixture<GracePayableGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GracePayableGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GracePayableGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
