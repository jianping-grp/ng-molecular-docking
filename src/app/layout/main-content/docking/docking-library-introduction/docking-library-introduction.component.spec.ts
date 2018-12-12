import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockingLibraryIntroductionComponent } from './docking-library-introduction.component';

describe('DockingLibraryIntroductionComponent', () => {
  let component: DockingLibraryIntroductionComponent;
  let fixture: ComponentFixture<DockingLibraryIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockingLibraryIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockingLibraryIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
