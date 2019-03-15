import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screening2ResultComponent } from './screening2-result.component';

describe('Screening2ResultComponent', () => {
  let component: Screening2ResultComponent;
  let fixture: ComponentFixture<Screening2ResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screening2ResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screening2ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
