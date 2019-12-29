import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyAgentTurnoverComponent } from './money-agent-turnover.component';

describe('MoneyAgentTurnoverComponent', () => {
  let component: MoneyAgentTurnoverComponent;
  let fixture: ComponentFixture<MoneyAgentTurnoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyAgentTurnoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyAgentTurnoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
