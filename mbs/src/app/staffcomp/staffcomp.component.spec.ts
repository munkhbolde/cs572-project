import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffcompComponent } from './staffcomp.component';

describe('StaffcompComponent', () => {
  let component: StaffcompComponent;
  let fixture: ComponentFixture<StaffcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
