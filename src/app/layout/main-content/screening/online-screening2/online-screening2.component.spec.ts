import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineScreening2Component } from './online-screening2.component';

describe('OnlineScreening2Component', () => {
  let component: OnlineScreening2Component;
  let fixture: ComponentFixture<OnlineScreening2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineScreening2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineScreening2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
