import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableVacanciesComponent } from './available-vacancies.component';

describe('AvailableVacanciesComponent', () => {
  let component: AvailableVacanciesComponent;
  let fixture: ComponentFixture<AvailableVacanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableVacanciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
