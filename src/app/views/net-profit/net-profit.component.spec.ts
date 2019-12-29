import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetProfitComponent } from './net-profit.component';

describe('NetProfitComponent', () => {
  let component: NetProfitComponent;
  let fixture: ComponentFixture<NetProfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetProfitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
