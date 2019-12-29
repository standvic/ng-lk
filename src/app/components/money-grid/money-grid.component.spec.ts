import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyGridComponent } from './money-grid.component';

describe('MoneyGridComponent', () => {
  let component: MoneyGridComponent;
  let fixture: ComponentFixture<MoneyGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
