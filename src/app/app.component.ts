import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StitchCompute } from 'stitch-compute';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  result = '';
  input = new FormGroup({
    from: new FormControl('1', [Validators.required, Validators.min(1), Validators.max(512)]),
    to: new FormControl('1', [Validators.required, Validators.min(1), Validators.max(512)]),
  });
  stitches = new StitchCompute();

  ngOnInit(): void {
    this.recalculate();
  }

  recalculate(): void {
    if (this.input.status === 'VALID') {
      try {
        this.result = this.stitches.adjust_evenly(this.getFrom(), this.getTo());
      }
      catch (e) {
        if (e instanceof Error) {
          this.result = e.message;
        }
        else {
          this.result = '';
          throw e;
        }
      }
    }
    else {
      this.result = '';
    }
  }

  private getFrom(): number {
    return + this.input.value.from;
  }

  private getTo(): number {
    return + this.input.value.to;
  }
}
