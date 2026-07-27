import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { HeroForm } from './hero-form';
import { Hero } from '../hero';

describe('HeroForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroForm, FormsModule],
    }).compileComponents();
  });

  it('creates the component', async () => {
    const fixture = TestBed.createComponent(HeroForm);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes the four power options in order', () => {
    const fixture = TestBed.createComponent(HeroForm);
    expect(fixture.componentInstance.powers).toEqual([
      'Really Smart',
      'Super Flexible',
      'Super Hot',
      'Weather Changer',
    ]);
  });

  it('initializes the model with default values', () => {
    const fixture = TestBed.createComponent(HeroForm);
    const { model } = fixture.componentInstance;
    expect(model.id).toBe(18);
    expect(model.name).toBe('Dr IQ');
    expect(model.power).toBe('Really Smart');
    expect(model.alterEgo).toBe('Chuck Overstreet');
  });

  it('starts not submitted and renders the form', async () => {
    const fixture = TestBed.createComponent(HeroForm);
    await fixture.whenStable();
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy();
    expect(fixture.componentInstance.submitted()).toBe(false);
  });

  it('renders four power <option> elements', async () => {
    const fixture = TestBed.createComponent(HeroForm);
    await fixture.whenStable();
    const options = fixture.nativeElement.querySelectorAll('select#power option');
    expect(options.length).toBe(4);
    expect(options[0].textContent).toContain('Really Smart');
  });

  it('disables the submit button until the form is valid', async () => {
    const fixture = TestBed.createComponent(HeroForm);
    await fixture.whenStable();
    const submit = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submit.disabled).toBe(false);
  });

  it('disables submit when name is cleared', async () => {
    const fixture = TestBed.createComponent(HeroForm);
    await fixture.whenStable();
    const nameInput = fixture.nativeElement.querySelector('#name');
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    const submit = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submit.disabled).toBe(true);
  });

  it('shows the "Name is required" message once the name is dirty and empty', async () => {
    const fixture = TestBed.createComponent(HeroForm);
    await fixture.whenStable();
    const nameInput = fixture.nativeElement.querySelector('#name');
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    const alert = fixture.nativeElement.querySelector('.alert.alert-danger');
    expect(alert).toBeTruthy();
    expect(alert.textContent).toContain('Name is required');
  });

  it('sets submitted to true on submit and renders the summary', async () => {
    const fixture = TestBed.createComponent(HeroForm);
    await fixture.whenStable();
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    expect(fixture.componentInstance.submitted()).toBe(true);
    const summary = fixture.nativeElement.querySelector('h2');
    expect(summary?.textContent).toContain('You submitted the following:');
  });

  it('reflects the submitted name in the summary', async () => {
    const fixture = TestBed.createComponent(HeroForm);
    await fixture.whenStable();
    const nameInput = fixture.nativeElement.querySelector('#name');
    nameInput.value = 'SkyDog';
    nameInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    const cells = fixture.nativeElement.querySelectorAll('.col-xs-9');
    expect(cells[0].textContent).toContain('SkyDog');
  });

  it('newHero() resets the model to an empty Hero (id 42)', () => {
    const fixture = TestBed.createComponent(HeroForm);
    fixture.componentInstance.newHero();
    expect(fixture.componentInstance.model.id).toBe(42);
    expect(fixture.componentInstance.model.name).toBe('');
    expect(fixture.componentInstance.model.power).toBe('');
  });

  it('diagnostic returns JSON for the current model', () => {
    const fixture = TestBed.createComponent(HeroForm);
    const parsed = JSON.parse(fixture.componentInstance.diagnostic);
    expect(parsed.name).toBe('Dr IQ');
  });
});

describe('Hero model', () => {
  it('constructs with required fields and optional alterEgo', () => {
    const hero = new Hero(1, 'SkyDog', 'Fetch any object at any distance', 'Leslie Rollover');
    expect(hero.id).toBe(1);
    expect(hero.name).toBe('SkyDog');
    expect(hero.power).toBe('Fetch any object at any distance');
    expect(hero.alterEgo).toBe('Leslie Rollover');
  });

  it('defaults alterEgo to undefined when omitted', () => {
    const hero = new Hero(2, 'Dr IQ', 'Really Smart');
    expect(hero.alterEgo).toBeUndefined();
  });
});