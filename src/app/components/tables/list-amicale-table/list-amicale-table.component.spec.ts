import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAmicaleTableComponent } from './list-amicale-table.component';

describe('ListAmicaleTableComponent', () => {
  let component: ListAmicaleTableComponent;
  let fixture: ComponentFixture<ListAmicaleTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAmicaleTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAmicaleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
