import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GbsaResultComponent } from './gbsa-result.component';

describe('GbsaResultComponent', () => {
  let component: GbsaResultComponent;
  let fixture: ComponentFixture<GbsaResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GbsaResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GbsaResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
