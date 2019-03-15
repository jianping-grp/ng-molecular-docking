import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Docking2ResultComponent } from './docking2-result.component';

describe('Docking2ResultComponent', () => {
  let component: Docking2ResultComponent;
  let fixture: ComponentFixture<Docking2ResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Docking2ResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Docking2ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
