import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockingPlatformIntroductionComponent } from './docking-platform-introduction.component';

describe('DockingPlatformIntroductionComponent', () => {
  let component: DockingPlatformIntroductionComponent;
  let fixture: ComponentFixture<DockingPlatformIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockingPlatformIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockingPlatformIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
