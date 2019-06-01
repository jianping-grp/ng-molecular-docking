import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaResultComponent } from './sea-result.component';

describe('SeaResultComponent', () => {
  let component: SeaResultComponent;
  let fixture: ComponentFixture<SeaResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeaResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeaResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
