import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningPlatformIntroductionComponent } from './screening-platform-introduction.component';

describe('ScreeningPlatformIntroductionComponent', () => {
  let component: ScreeningPlatformIntroductionComponent;
  let fixture: ComponentFixture<ScreeningPlatformIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreeningPlatformIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningPlatformIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
