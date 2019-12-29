import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUnmarketableComponent } from './stock-unmarketable.component';

describe('StockUnmarketableComponent', () => {
  let component: StockUnmarketableComponent;
  let fixture: ComponentFixture<StockUnmarketableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockUnmarketableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockUnmarketableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
