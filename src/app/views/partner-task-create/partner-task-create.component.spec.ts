import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerTaskCreateComponent } from './partner-task-create.component';

describe('PartnerTaskCreateComponent', () => {
  let component: PartnerTaskCreateComponent;
  let fixture: ComponentFixture<PartnerTaskCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerTaskCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerTaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
