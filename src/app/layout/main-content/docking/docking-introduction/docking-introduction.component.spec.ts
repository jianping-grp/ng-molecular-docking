import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockingIntroductionComponent } from './docking-introduction.component';

describe('DockingIntroductionComponent', () => {
  let component: DockingIntroductionComponent;
  let fixture: ComponentFixture<DockingIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockingIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockingIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
