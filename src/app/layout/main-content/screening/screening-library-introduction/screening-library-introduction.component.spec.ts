import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningLibraryIntroductionComponent } from './screening-library-introduction.component';

describe('ScreeningLibraryIntroductionComponent', () => {
  let component: ScreeningLibraryIntroductionComponent;
  let fixture: ComponentFixture<ScreeningLibraryIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreeningLibraryIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningLibraryIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
