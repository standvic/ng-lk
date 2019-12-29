import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressIssueCommandComponent } from './in-progress-issue-command.component';

describe('InProgressIssueCommandComponent', () => {
  let component: InProgressIssueCommandComponent;
  let fixture: ComponentFixture<InProgressIssueCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InProgressIssueCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressIssueCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
