import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundDataGridComponent } from './compound-data-grid.component';

describe('CompoundDataGridComponent', () => {
  let component: CompoundDataGridComponent;
  let fixture: ComponentFixture<CompoundDataGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundDataGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
