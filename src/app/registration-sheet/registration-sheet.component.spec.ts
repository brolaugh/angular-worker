import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSheetComponent } from './registration-sheet.component';

describe('RegistrationSheetComponent', () => {
  let component: RegistrationSheetComponent;
  let fixture: ComponentFixture<RegistrationSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
