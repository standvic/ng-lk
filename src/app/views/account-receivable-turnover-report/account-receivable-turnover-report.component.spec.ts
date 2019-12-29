import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountReceivableTurnoverReportComponent } from './account-receivable-turnover-report.component';

describe('AccountReceivableTurnoverReportComponent', () => {
  let component: AccountReceivableTurnoverReportComponent;
  let fixture: ComponentFixture<AccountReceivableTurnoverReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountReceivableTurnoverReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountReceivableTurnoverReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
