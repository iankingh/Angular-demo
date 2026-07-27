import { TestBed } from '@angular/core/testing';
import { TemplateDrivenForm } from './template-driven-form';

describe('TemplateDrivenForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateDrivenForm],
    }).compileComponents();
  });

  it('creates the component', async () => {
    const fixture = TestBed.createComponent(TemplateDrivenForm);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes two gender options', () => {
    const fixture = TestBed.createComponent(TemplateDrivenForm);
    expect(fixture.componentInstance.genders.length).toBe(2);
  });

  it('renders four location options', async () => {
    const fixture = TestBed.createComponent(TemplateDrivenForm);
    await fixture.whenStable();
    const options = fixture.nativeElement.querySelectorAll('select#location option');
    expect(options.length).toBe(4);
  });
});