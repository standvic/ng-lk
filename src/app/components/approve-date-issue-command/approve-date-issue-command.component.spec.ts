import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDateIssueCommandComponent } from './approve-date-issue-command.component';

describe('ApproveDateIssueCommandComponent', () => {
  let component: ApproveDateIssueCommandComponent;
  let fixture: ComponentFixture<ApproveDateIssueCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDateIssueCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDateIssueCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
