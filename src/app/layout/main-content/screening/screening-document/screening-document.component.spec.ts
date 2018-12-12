import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningDocumentComponent } from './screening-document.component';

describe('ScreeningDocumentComponent', () => {
  let component: ScreeningDocumentComponent;
  let fixture: ComponentFixture<ScreeningDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreeningDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
