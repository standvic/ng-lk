import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinationIssueCommandComponent } from './coordination-issue-command.component';

describe('CoordinationIssueCommandComponent', () => {
  let component: CoordinationIssueCommandComponent;
  let fixture: ComponentFixture<CoordinationIssueCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinationIssueCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinationIssueCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
