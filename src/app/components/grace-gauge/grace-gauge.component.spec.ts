import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraceGaugeComponent } from './grace-gauge.component';

describe('GraceGaugeComponent', () => {
  let component: GraceGaugeComponent;
  let fixture: ComponentFixture<GraceGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraceGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraceGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
