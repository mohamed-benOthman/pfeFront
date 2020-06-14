import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAmicalesComponent } from './list-amicales.component';

describe('ListAmicalesComponent', () => {
  let component: ListAmicalesComponent;
  let fixture: ComponentFixture<ListAmicalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAmicalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAmicalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
