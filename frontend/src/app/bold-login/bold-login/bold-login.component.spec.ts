import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoldLoginComponent } from './bold-login.component';

describe('BoldLoginComponent', () => {
  let component: BoldLoginComponent;
  let fixture: ComponentFixture<BoldLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoldLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoldLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
