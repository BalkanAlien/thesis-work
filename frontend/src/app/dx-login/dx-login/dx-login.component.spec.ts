import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxLoginComponent } from './dx-login.component';

describe('DxLoginComponent', () => {
  let component: DxLoginComponent;
  let fixture: ComponentFixture<DxLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
