import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerTaskInfoComponent } from './partner-task-info.component';

describe('PartnerTaskInfoComponent', () => {
  let component: PartnerTaskInfoComponent;
  let fixture: ComponentFixture<PartnerTaskInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerTaskInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerTaskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
