import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAmicaleComponent } from './edit-amicale.component';

describe('EditAmicaleComponent', () => {
  let component: EditAmicaleComponent;
  let fixture: ComponentFixture<EditAmicaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAmicaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAmicaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
