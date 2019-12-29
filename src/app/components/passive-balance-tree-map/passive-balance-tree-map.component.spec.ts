import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveBalanceTreeMapComponent } from './passive-balance-tree-map.component';

describe('PassiveBalanceTreeMapComponent', () => {
  let component: PassiveBalanceTreeMapComponent;
  let fixture: ComponentFixture<PassiveBalanceTreeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassiveBalanceTreeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassiveBalanceTreeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
