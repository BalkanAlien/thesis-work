import { formatCurrency } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

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

  it('set API key', async () => {
    const apiKey = fixture.debugElement.query(By.css('#apiKey'));
    apiKey.nativeElement.value = '12345';
    apiKey.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(apiKey.nativeElement.value).toContain('12345');
    });
  });
});
