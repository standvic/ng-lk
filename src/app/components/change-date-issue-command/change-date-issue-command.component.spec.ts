import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDateIssueCommandComponent } from './change-date-issue-command.component';

describe('ChangeDateIssueCommandComponent', () => {
  let component: ChangeDateIssueCommandComponent;
  let fixture: ComponentFixture<ChangeDateIssueCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDateIssueCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDateIssueCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
