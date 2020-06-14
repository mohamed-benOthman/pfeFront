import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmicalesCardComponent } from './amicales-card.component';

describe('AmicalesCardComponent', () => {
  let component: AmicalesCardComponent;
  let fixture: ComponentFixture<AmicalesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmicalesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmicalesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
