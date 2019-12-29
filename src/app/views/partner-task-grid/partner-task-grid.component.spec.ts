import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerTaskGridComponent } from './partner-task-grid.component';

describe('PartnerTaskGridComponent', () => {
  let component: PartnerTaskGridComponent;
  let fixture: ComponentFixture<PartnerTaskGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerTaskGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerTaskGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
