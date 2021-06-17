import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('Help', () => {
    it('should not be shown initially', () => {
      expect(compiled.querySelector('#grayout')).toBeNull();
      expect(compiled.querySelector('#closeHelp')).toBeNull();
    });

    it(`should be shown after clicking 'help'`, () => {
      (compiled.querySelector('#openHelp') as HTMLButtonElement).click();
      fixture.detectChanges();
      expect(compiled.querySelector('#grayout')).not.toBeNull();
      expect(compiled.querySelector('#closeHelp')).not.toBeNull();
    });

    it(`should be removed after clicking 'close'`, () => {
      (compiled.querySelector('#openHelp') as HTMLButtonElement).click();
      fixture.detectChanges();
      (compiled.querySelector('#closeHelp') as HTMLButtonElement).click();
      fixture.detectChanges();
      expect(compiled.querySelector('#grayout')).toBeNull();
      expect(compiled.querySelector('#closeHelp')).toBeNull();
    });

    it(`should be removed after clicking the help dialog box`, () => {
      (compiled.querySelector('#openHelp') as HTMLButtonElement).click();
      fixture.detectChanges();
      (compiled.querySelector('#help') as HTMLButtonElement).click();
      fixture.detectChanges();
      expect(compiled.querySelector('#grayout')).toBeNull();
      expect(compiled.querySelector('#closeHelp')).toBeNull();
    });
  });
});
