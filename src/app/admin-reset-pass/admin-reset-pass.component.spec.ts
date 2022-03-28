import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResetPassComponent } from './admin-reset-pass.component';

describe('AdminResetPassComponent', () => {
  let component: AdminResetPassComponent;
  let fixture: ComponentFixture<AdminResetPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminResetPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
