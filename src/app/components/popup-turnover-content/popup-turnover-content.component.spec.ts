import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTurnoverContentComponent } from './popup-turnover-content.component';

describe('PopupTurnoverContentComponent', () => {
  let component: PopupTurnoverContentComponent;
  let fixture: ComponentFixture<PopupTurnoverContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupTurnoverContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupTurnoverContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
