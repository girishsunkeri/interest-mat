import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollEventComponent } from './enroll-event.component';

describe('EnrollEventComponent', () => {
  let component: EnrollEventComponent;
  let fixture: ComponentFixture<EnrollEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
