import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningHomeComponent } from './screening-home.component';

describe('ScreeningHomeComponent', () => {
  let component: ScreeningHomeComponent;
  let fixture: ComponentFixture<ScreeningHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreeningHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
