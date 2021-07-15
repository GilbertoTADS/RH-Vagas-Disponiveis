import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVacancieComponent } from './details-vacancie.component';

describe('DetailsVacancieComponent', () => {
  let component: DetailsVacancieComponent;
  let fixture: ComponentFixture<DetailsVacancieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsVacancieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVacancieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
