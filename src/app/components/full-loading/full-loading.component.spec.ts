import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullLoadingComponent } from './full-loading.component';

describe('FullLoadingComponent', () => {
  let component: FullLoadingComponent;
  let fixture: ComponentFixture<FullLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
