import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBalanceTreeMapComponent } from './active-balance-tree-map.component';

describe('ActiveBalanceTreeMapComponent', () => {
  let component: ActiveBalanceTreeMapComponent;
  let fixture: ComponentFixture<ActiveBalanceTreeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveBalanceTreeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveBalanceTreeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
