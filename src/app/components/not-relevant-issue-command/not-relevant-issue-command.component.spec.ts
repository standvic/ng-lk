import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotRelevantIssueCommandComponent } from './not-relevant-issue-command.component';

describe('NotRelevantIssueCommandComponent', () => {
  let component: NotRelevantIssueCommandComponent;
  let fixture: ComponentFixture<NotRelevantIssueCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotRelevantIssueCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotRelevantIssueCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
