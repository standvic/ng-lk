import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupLinechartComponent } from './popup-linechart.component';

describe('PopupLinechartComponent', () => {
  let component: PopupLinechartComponent;
  let fixture: ComponentFixture<PopupLinechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupLinechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupLinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
