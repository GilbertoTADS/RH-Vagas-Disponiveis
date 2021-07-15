import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGlobalComponent } from './modal-global.component';

describe('ModalGlobalComponent', () => {
  let component: ModalGlobalComponent;
  let fixture: ComponentFixture<ModalGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
