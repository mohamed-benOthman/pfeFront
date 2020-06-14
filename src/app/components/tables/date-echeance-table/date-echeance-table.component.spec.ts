import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateEcheanceTableComponent } from './date-echeance-table.component';

describe('DateEcheanceTableComponent', () => {
  let component: DateEcheanceTableComponent;
  let fixture: ComponentFixture<DateEcheanceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateEcheanceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateEcheanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
