import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BUILD_INFO } from 'src/environments/buildinfo';
import { FormatterSet, StitchCompute } from 'stitch-compute';

import '@angular/localize/init'; // provides $localize

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly localizedFormatters: FormatterSet = {
    keepStitches: $localize`:@@keepFormat:K%d`,
    addStitches: $localize`:@@addFormat:A%d`,
    combineStitches: $localize`:@@combineFormat:C%d`,
    groupInstructions: $localize`:@@groupFormat:%dx ( %s )`,
    listSeparator: $localize`:@@listSeparatorFormat: `
  };
  readonly input = new UntypedFormGroup({
    from: new UntypedFormControl('1', [Validators.required, Validators.min(1), Validators.max(512)]),
    to: new UntypedFormControl('1', [Validators.required, Validators.min(1), Validators.max(512)])
  });
  readonly stitches = new StitchCompute();
  readonly buildInfo = BUILD_INFO;
  result = '';
  error = '';
  isHelpVisible = false;

  ngOnInit(): void {
    this.stitches.setFormatters(this.localizedFormatters);
    this.recalculate();
  }

  recalculate(): void {
    if (this.input.status === 'VALID') {
      try {
        const from = this.getFrom();
        const to = this.getTo();
        this.validateInput(from, to);
        this.setResult(this.stitches.adjustEvenly(from, to));
      } catch (e) {
        if (e instanceof Error) {
          this.setError(e.message);
        } else {
          this.setError($localize`:@@errUncaughtError:uncaught error`);
          throw e;
        }
      }
    } else {
      this.setError($localize`:@@errInvalidInput:invalid input`);
    }
  }

  setResult(result: string): void {
    this.result = result;
    this.error = '';
  }

  setError(error: string): void {
    this.result = '';
    this.error = error;
  }

  public openHelp(): void {
    this.isHelpVisible = true;
  }

  public closeHelp(): void {
    this.isHelpVisible = false;
  }

  private getFrom(): number {
    return +this.input.value.from;
  }

  private getTo(): number {
    return +this.input.value.to;
  }

  // duplicate checks from stitch-compute to allow for localized error messages
  private validateInput(from: number, to: number) {
    const max = 2 * from;
    const min = Math.floor((from + 1) / 2);
    if (to > max) {
      throw new Error($localize`:@@errToTooBig:too many stitches to add - ${from} can grow to ${max} max`);
    }
    if (to < min) {
      throw new Error($localize`:@@errToTooSmall:too few stitches to keep - ${from} can shrink to ${min} min`);
    }
  }
}
