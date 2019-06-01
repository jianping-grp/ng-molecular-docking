import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockingResultComponent } from './docking-result.component';

describe('DockingResultComponent', () => {
  let component: DockingResultComponent;
  let fixture: ComponentFixture<DockingResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockingResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
