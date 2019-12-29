import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectButtonComponent } from './direct-button.component';

describe('DirectButtonComponent', () => {
  let component: DirectButtonComponent;
  let fixture: ComponentFixture<DirectButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
