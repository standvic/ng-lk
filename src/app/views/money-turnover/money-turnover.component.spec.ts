import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTurnoverComponent } from './money-turnover.component';

describe('MoneyTurnoverComponent', () => {
  let component: MoneyTurnoverComponent;
  let fixture: ComponentFixture<MoneyTurnoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyTurnoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyTurnoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
