import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Screening1ResultComponent } from './screening1-result.component';

describe('Screening1ResultComponent', () => {
  let component: Screening1ResultComponent;
  let fixture: ComponentFixture<Screening1ResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Screening1ResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screening1ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
