import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReworkIssueCommandComponent } from './rework-issue-command.component';

describe('ReworkIssueCommandComponent', () => {
  let component: ReworkIssueCommandComponent;
  let fixture: ComponentFixture<ReworkIssueCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReworkIssueCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReworkIssueCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
