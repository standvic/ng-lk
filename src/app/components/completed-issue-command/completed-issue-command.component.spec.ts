import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedIssueCommandComponent } from './completed-issue-command.component';

describe('CompletedIssueCommandComponent', () => {
  let component: CompletedIssueCommandComponent;
  let fixture: ComponentFixture<CompletedIssueCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedIssueCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedIssueCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
