import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeScanerComponent } from './qr-code-scaner.component';

describe('QrCodeScanerComponent', () => {
  let component: QrCodeScanerComponent;
  let fixture: ComponentFixture<QrCodeScanerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodeScanerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeScanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
