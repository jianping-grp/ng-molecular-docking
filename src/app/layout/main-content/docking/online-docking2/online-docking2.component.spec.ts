import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineDocking2Component } from './online-docking2.component';

describe('OnlineDocking2Component', () => {
  let component: OnlineDocking2Component;
  let fixture: ComponentFixture<OnlineDocking2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineDocking2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineDocking2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
