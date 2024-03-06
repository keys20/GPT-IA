import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static noWhiteSpece(control: AbstractControl) {
    const isWhiteSpace = (control.value || '').trim().length === 0;
    return !isWhiteSpace ? null : {'whitespace': true}
  }
}
