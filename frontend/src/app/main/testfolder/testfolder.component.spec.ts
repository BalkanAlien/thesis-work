import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestfolderComponent } from './testfolder.component';

describe('TestfolderComponent', () => {
  let component: TestfolderComponent;
  let fixture: ComponentFixture<TestfolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestfolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
