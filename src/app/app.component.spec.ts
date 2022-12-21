import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, SelectControlValueAccessor } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [AppComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have default values for input fields', () => {
    expect(getInputFieldFrom(fixture).value).toBe('1');
    expect(getInputFieldTo(fixture).value).toBe('1');
  });

  it('should have default output of K1', () => {
    expect(getResult(fixture)).toBe('K1');
  });

  it('should have different result on different input', () => {
    setInputFieldFrom(fixture, '8');
    setInputFieldTo(fixture, '5');
    fixture.detectChanges();
    expect(getResult(fixture)).toBe('K1 C2 K1 C1');
  });
});

function getInputFieldFrom(fixture: ComponentFixture<AppComponent>): HTMLInputElement {
  return queryBySelector(fixture, '[data-testid="input-from"]') as HTMLInputElement;
}

function getInputFieldTo(fixture: ComponentFixture<AppComponent>): HTMLInputElement {
  return queryBySelector(fixture, '[data-testid="input-to"]') as HTMLInputElement;
}

function getResult(fixture: ComponentFixture<AppComponent>): string {
  return (queryBySelector(fixture, '[data-testid="result"]').textContent as string).trim();
}

function setInputFieldFrom(fixture: ComponentFixture<AppComponent>, newValue: string) {
  setValue(getInputFieldFrom(fixture), newValue);
}

function setInputFieldTo(fixture: ComponentFixture<AppComponent>, newValue: string) {
  setValue(getInputFieldTo(fixture), newValue);
}

function setValue(inputField: HTMLInputElement, newValue: string) {
  inputField.value = newValue;
  inputField.dispatchEvent(new Event('input'));
}

function queryBySelector(fixture: ComponentFixture<AppComponent>, selector: string) {
  return fixture.nativeElement.querySelector(selector);
}
