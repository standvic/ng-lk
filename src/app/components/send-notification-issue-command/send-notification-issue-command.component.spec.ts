import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNotificationIssueCommandComponent } from './send-notification-issue-command.component';

describe('SendNotificationIssueCommandComponent', () => {
  let component: SendNotificationIssueCommandComponent;
  let fixture: ComponentFixture<SendNotificationIssueCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendNotificationIssueCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendNotificationIssueCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
