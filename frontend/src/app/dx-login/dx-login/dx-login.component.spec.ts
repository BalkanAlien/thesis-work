import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxLoginComponent } from './dx-login.component';

import { By } from '@angular/platform-browser';

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

  it('set email', async () => {
    const email = fixture.debugElement.query(By.css('#email'));
    email.nativeElement.value = 'kajsibesopravis@gmail.com';
    email.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    fixture.detectChanges();

    expect(email.nativeElement.value).toContain('kajsibesopravis@gmail.com');
    });
  });

  it('set password', async () => {
    const password = fixture.debugElement.query(By.css('#password'));
    password.nativeElement.value = 'obrebre';
    password.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    fixture.detectChanges();

    expect(password.nativeElement.value).toContain('obrebre');
    });
  });

  it('set org', async () => {
    const org = fixture.debugElement.query(By.css('#org'));
    org.nativeElement.value = 'Sales';
    org.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    fixture.detectChanges();

    expect(org.nativeElement.value).toContain('Sales');
    });
  });
});
