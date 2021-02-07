import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BUILD_INFO } from 'src/environments/buildinfo';
import { StitchCompute } from 'stitch-compute';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly input = new FormGroup({
    from: new FormControl('1', [Validators.required, Validators.min(1), Validators.max(512)]),
    to: new FormControl('1', [Validators.required, Validators.min(1), Validators.max(512)]),
  });
  readonly stitches = new StitchCompute();
  readonly buildInfo = BUILD_INFO;
  result = '';
  error = '';
  isHelpVisible = false;

  ngOnInit(): void {
    this.recalculate();
  }

  recalculate(): void {
    if (this.input.status === 'VALID') {
      try {
        this.setResult(this.stitches.adjustEvenly(this.getFrom(), this.getTo()));
      }
      catch (e) {
        if (e instanceof Error) {
          this.setError(e.message);
        }
        else {
          this.setError('uncaught error');
          throw e;
        }
      }
    }
    else {
      this.setError('invalid input');
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
    return + this.input.value.from;
  }

  private getTo(): number {
    return + this.input.value.to;
  }
}
