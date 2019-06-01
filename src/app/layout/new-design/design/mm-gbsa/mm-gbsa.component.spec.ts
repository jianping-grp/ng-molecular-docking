import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmGbsaComponent } from './mm-gbsa.component';

describe('MmGbsaComponent', () => {
  let component: MmGbsaComponent;
  let fixture: ComponentFixture<MmGbsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmGbsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmGbsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
