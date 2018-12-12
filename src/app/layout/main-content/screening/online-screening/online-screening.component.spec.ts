import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineScreeningComponent } from './online-screening.component';

describe('OnlineScreeningComponent', () => {
  let component: OnlineScreeningComponent;
  let fixture: ComponentFixture<OnlineScreeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineScreeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
