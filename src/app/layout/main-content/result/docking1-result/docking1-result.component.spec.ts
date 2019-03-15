import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Docking1ResultComponent } from './docking1-result.component';

describe('Docking1ResultComponent', () => {
  let component: Docking1ResultComponent;
  let fixture: ComponentFixture<Docking1ResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Docking1ResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Docking1ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
