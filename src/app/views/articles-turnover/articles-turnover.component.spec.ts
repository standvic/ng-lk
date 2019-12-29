import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesTurnoverComponent } from './articles-turnover.component';

describe('ArticlesTurnoverComponent', () => {
  let component: ArticlesTurnoverComponent;
  let fixture: ComponentFixture<ArticlesTurnoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesTurnoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesTurnoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
