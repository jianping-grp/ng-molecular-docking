import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockingHomeComponent } from './docking-home.component';

describe('DockingHomeComponent', () => {
  let component: DockingHomeComponent;
  let fixture: ComponentFixture<DockingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
