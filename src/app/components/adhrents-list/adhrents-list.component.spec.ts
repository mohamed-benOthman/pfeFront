import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhrentsListComponent } from './adhrents-list.component';

describe('AdhrentsListComponent', () => {
  let component: AdhrentsListComponent;
  let fixture: ComponentFixture<AdhrentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhrentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhrentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
