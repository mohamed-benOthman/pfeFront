import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdherentsComponent } from './all-adherents.component';

describe('AllAdherentsComponent', () => {
  let component: AllAdherentsComponent;
  let fixture: ComponentFixture<AllAdherentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAdherentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAdherentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
