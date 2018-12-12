import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockingDocumentComponent } from './docking-document.component';

describe('DockingDocumentComponent', () => {
  let component: DockingDocumentComponent;
  let fixture: ComponentFixture<DockingDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockingDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockingDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
