import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingAmicalComponent } from './adding-amical.component';

describe('AddingAmicalComponent', () => {
  let component: AddingAmicalComponent;
  let fixture: ComponentFixture<AddingAmicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingAmicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingAmicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
